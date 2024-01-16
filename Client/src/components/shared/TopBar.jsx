// import React from 'react';
// import { Navbar, TextInput } from 'flowbite-react';
// import { HiSearch, HiOutlineHeart } from 'react-icons/hi';

// const TopBar = () => {
//     return (
//         <Navbar fluid rounded className='visible md:hidden'>
//             <div className='flex flex-1 justify-between items-center gap-1'>
//                 <img src="/assets/logoIcon.png" className="h-9" alt="Logo" />
//                 <div className='flex items-center'>
//                 <TextInput className="mx-2" id="search" type="Search" icon={HiSearch} placeholder="Search" sizing="md" />
//                 <HiOutlineHeart id="Notifications" className='mx-2 text-3xl' />
//                 </div>
//             </div>
//         </Navbar>
//     );
// }

// export default TopBar


import React from 'react';
import { TextInput } from 'flowbite-react';
import { HiSearch, HiOutlineHeart } from 'react-icons/hi';
import { sidebarLinks } from '../../constatnts';
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

          {sidebarLinks.map((link, index) => {
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