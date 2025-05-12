import React from 'react';
import { TextInput } from 'flowbite-react';
import { HiSearch, HiOutlineHeart } from 'react-icons/hi';
import { SIDEBAR_LINKS } from '../../constants';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className='visible md:hidden pl-4 pt-2'>
      <div className='flex flex-1 justify-between items-center gap-3'>
        <Link to="/">
          <img src="/assets/logoIcon.png" className="h-9" alt="Logo" />
        </Link>
        
        <div className='flex items-center'>
          <TextInput sizing="md" id="search" type="Search" icon={HiSearch} placeholder="Search" />

          {SIDEBAR_LINKS.map((link, index) => {
            if (link.label === "Notifications")
              return (
                <Link to={link.route} key={index} className={`cursor-pointer block py-2 px-4`}>
                  <HiOutlineHeart id="Notifications" className='mx-2 text-3xl' />
                </Link>
              );
          })}


        </div>
      </div>
    </div>
  );
}

export default TopBar