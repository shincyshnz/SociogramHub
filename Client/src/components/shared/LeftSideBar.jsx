import { Dropdown, Sidebar } from 'flowbite-react';
import { useAuth } from '../../hooks/customHooks';
import { HiMenu } from 'react-icons/hi';
import MoreDropdown from '../MoreDropdown';
import { sidebarLinks } from '../../constatnts';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CreatePost } from '../../_root/pages';


const LeftSideBar = () => {
  const { pathname } = useLocation();
  const { userDetails } = useAuth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <>
      <section className='hidden md:block'>
        <Sidebar className="max-w-[80px] mx-auto lg:max-w-full" aria-label="Sidebar with content separator example">
          <div className="flex flex-col justify-between h-full">
            <div>
              <Sidebar.Logo className="block lg:hidden" href="/" img="/assets/logoIcon.png" imgAlt="SociogramHub logo" />
              <Sidebar.Logo className="hidden lg:block" href="/" img="/assets/logo.png" imgAlt="SociogramHub logo" />

              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  {sidebarLinks.map((link, index) => {
                    const LabelElement = <div className='flex flex-1 gap-3 items-center'>
                      <div className='text-2xl'>{link.icon}</div>
                      <span className="hidden lg:block">{link.label}</span>
                    </div>;

                    // Create-post modal 
                    if (link.label === "Create") {
                      return (
                        <button onClick={() => setIsCreatePostOpen(true)} key={index} className={"cursor-pointer block py-2 px-4"}>
                          {LabelElement}
                        </button>
                      );
                    }

                    // All other links in sidebar
                    const isActive = pathname === link.route;
                    return (
                      <Link to={`${link.route}`} key={index} className={`cursor-pointer block py-2 px-4 ${isActive && 'bg-gray-100'}`}>
                        {LabelElement}
                      </Link>
                    );
                  })}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item>
                  <Dropdown className="w-[200px] cursor-pointer" label="" dismissOnClick={false} placement="top" renderTrigger={() => <div className='flex items-center justify-start'><HiMenu className='mr-2 text-gray-600 text-2xl' /><span className="hidden lg:block">More</span> </div>}>
                    <MoreDropdown position="leftsidebar" />
                  </Dropdown>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </section >

      {isCreatePostOpen && <CreatePost isCreatePostOpen={isCreatePostOpen} setIsCreatePostOpen={setIsCreatePostOpen} />}
    </>

  );
}
export default LeftSideBar;