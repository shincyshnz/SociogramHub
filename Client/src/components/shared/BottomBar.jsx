import React from 'react';
import { Dropdown, Navbar } from 'flowbite-react';
import { useLocation, Link } from 'react-router-dom';
import { sidebarLinks } from '../../constatnts';
import UserAvatar from './UserAvatar';
import MoreDropdown from '../MoreDropdown';

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <Navbar fluid rounded className='visible md:hidden border-t-2 p-0'>
      <Navbar className='text-xl w-full'>

        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.route;

          if (["Search", "Notifications", "Profile"].includes(link.label)) return;
          return (
            <Link to={link.route} key={index} className={`${isActive && 'bg-gray-200'} p-3 rounded-sm`}>
              {link.icon}
            </Link>
          )
        })}

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <UserAvatar />
          }>
          <MoreDropdown position="bottom" />
        </Dropdown>
      </Navbar>
    </Navbar>
  );

}
export default BottomBar