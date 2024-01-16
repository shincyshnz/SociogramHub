import React, { useState } from 'react';
import { Dropdown, Navbar } from 'flowbite-react';
import { useLocation, Link } from 'react-router-dom';
import { sidebarLinks } from '../../constatnts';
import UserAvatar from './UserAvatar';
import MoreDropdown from '../MoreDropdown';
import { CreatePost } from '../../_root/pages';

const BottomBar = () => {
  const { pathname } = useLocation();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
      <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <Navbar fluid rounded className='w-full md:hidden border-t-2 p-0'>
          <Navbar className='text-xl w-full'>

            {sidebarLinks.map((link, index) => {
              // Links excluded in Bottombar and Notification and Search included in Topbar
              if (["Search", "Notifications", "Profile"].includes(link.label)) return;

              // Create-post modal 
              if (link.label === "Create") {
                return (
                  <button onClick={() => setIsCreatePostOpen(true)} key={index} className={"cursor-pointer key={index} p-3 rounded-sm"}>
                    {link.icon}
                  </button>
                );
              }

              // All other links
              const isActive = pathname === link.route;
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

        {isCreatePostOpen && <CreatePost isCreatePostOpen={isCreatePostOpen} setIsCreatePostOpen={setIsCreatePostOpen} />}
      </div>
  );

}
export default BottomBar