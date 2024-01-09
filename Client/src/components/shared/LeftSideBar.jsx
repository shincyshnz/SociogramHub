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
      <section className='hidden md:block border-r-2 pr-3'>
        <Sidebar className="max-w-[80px] mx-auto lg:max-w-full">
          <div className="flex flex-col justify-between h-full">
            <div>
              <Sidebar.Logo className="block lg:hidden ml-2" href="/" img="/assets/logoIcon.png" imgAlt="SociogramHub logo" />
              <Sidebar.Logo className="hidden lg:block" href="/" img="/assets/logo.png" imgAlt="SociogramHub logo" />

              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  {sidebarLinks.map((link, index) => {
                    const LabelElement = <div className='flex items-center'>
                      <div className='text-3xl'>{link.icon}</div>
                      <div className="hidden lg:block text-lg">{link.label}</div>
                    </div>;

                    // Create-post modal 
                    if (link.label === "Create") {
                      return (
                        <a><button onClick={() => setIsCreatePostOpen(true)} key={index} className={"cursor-pointer block py-3 px-4"}>
                          {LabelElement}
                        </button></a>
                      );
                    }

                    // All other links in sidebar
                    const isActive = pathname === link.route;
                    return (
                      <Link to={`${link.route}`} key={index}
                        className={`cursor-pointer block py-2 px-4 ${isActive && 'bg-gray-200 rounded-lg'}`}>
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
                  <Dropdown className="w-[200px] cursor-pointer" label=""
                    dismissOnClick={false} placement="top"
                    renderTrigger={() =>
                      <div className='flex items-center justify-start '>
                        <HiMenu className='mr-5 text-3xl' />
                        <span className="hidden lg:block text-xl">More</span>
                      </div>}>
                    <MoreDropdown position="leftsidebar" />
                  </Dropdown>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </section >

      {isCreatePostOpen &&
        <CreatePost isCreatePostOpen={isCreatePostOpen} setIsCreatePostOpen={setIsCreatePostOpen} />}
    </>

  );
}
export default LeftSideBar;