import { Dropdown, Sidebar } from 'flowbite-react';
import { useAuth } from '../../hooks/customHooks';
import { HiMenu } from 'react-icons/hi';
import MoreDropdown from '../MoreDropdown';
import { sidebarLinks } from '../../constatnts';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


const LeftSideBar = () => {
  const { pathname } = useLocation();
  const { userDetails } = useAuth();

  return (
    <section className='hidden md:block'>
      <Sidebar aria-label="Sidebar with content separator example">
        <div className="flex flex-col justify-between h-full">
          <div>
            <Sidebar.Logo href="#" img="/assets/logo.png" imgAlt="SociogramHub logo" />

            <Sidebar.Items>
              <Sidebar.ItemGroup>
                  {sidebarLinks.map((link, index) => {
                    const isActive = pathname === link.route;
                    const profileLink = link.label === "Profile" && `${link.route}/${userDetails._id}`;

                    return (
                        <Link to={`${profileLink ? profileLink : link.route}`} key={index} className={`cursor-pointer block py-2 px-4 ${isActive && 'bg-gray-100'}`}>
                          <div className='flex flex-1 gap-3 items-center'>
                            <div className='text-2xl'>{link.icon}</div>
                            {link.label}
                          </div>
                        </Link>
                      );
                  })}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item>
                <Dropdown className="w-[200px] cursor-pointer" label="" dismissOnClick={false} placement="top" renderTrigger={() => <div className='flex items-center justify-start'><HiMenu className='mr-2 text-gray-600 text-2xl' /><span>More</span> </div>}>
                  <MoreDropdown position="leftsidebar" />
                </Dropdown>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </Sidebar>
    </section >

  );
}
export default LeftSideBar;