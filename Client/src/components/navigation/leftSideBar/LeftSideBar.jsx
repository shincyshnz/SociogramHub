import { Dropdown, Sidebar } from 'flowbite-react';
// import { useAuth } from '../../hooks/customHooks';
import { HiMenu } from 'react-icons/hi';
import MoreDropdown from './MoreDropdown';
import { SIDEBAR_LINKS } from '../../../constants';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CreatePost } from '../../../_root/pages';
import { useQueryClient } from '@tanstack/react-query';
import { useGetProfile } from '../../../lib/reactQuery/queriesAndMutations';
import { useAuth } from '../../../hooks/customHooks';

const LeftSideBar = () => {
  const { pathname } = useLocation();
  const { userDetails } = useAuth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // // Accessing profile data from cache
  // const queryClient = useQueryClient();
  // const profile = queryClient.getQueryData(['profile']);

  //  React-Query - fetching loggedIn user data
  // const {
  //   data: profile,
  //   isPending: isPendingProfile,
  //   isError: isErrorProfile,
  //   error: profileError,
  // } = useGetProfile();
  console.log(userDetails);

  return (
    <>
      <aside id="default-sidebar" className="hidden md:block fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

        <section className='hidden md:block h-screen lg:border-r-2 text-[16px]'>
          <Sidebar className="max-w-[80px] max-h-screen lg:mx-auto lg:max-w-full">
            {/* <div className="flex flex-col justify-between items-baseline h-full w-full"> */}
            <Sidebar.Logo className="block lg:hidden ml-1" href="/" img="/assets/logoIcon.png" imgAlt="SociogramHub logo" />
            <Sidebar.Logo className="hidden lg:block ml-10" href="/" img="/assets/logo.png" imgAlt="SociogramHub logo" />

            <Sidebar.Items className='mt-14'>
              <Sidebar.ItemGroup>
                {SIDEBAR_LINKS.map((link, index) => {
                  const isActive = pathname === link.route;

                  const LabelElement = <div className='flex items-center text-[16px]'>
                    <div className={`text-2xl mr-5 py-1 px-2 ${isActive && 'md:bg-gray-200 md:rounded-lg'}`}>{link.icon}</div>
                    <div className={`hidden lg:block ${isActive && 'font-bold'}`}>{link.label}</div>
                  </div>;

                  // Add userId with profile route
                  if (link.label === "Profile") {
                    link.route = `${link.route}/${profile._id}`;
                  }

                  // Create-post modal 
                  if (link.label === "Create") {

                    return (
                      <a key={index}>
                        <button onClick={() => setIsCreatePostOpen(true)} className={"cursor-pointer block py-3 px-2"}>
                          {LabelElement}
                        </button>
                      </a>
                    );
                  }

                  // All other links in sidebar
                  return (
                    <Link to={`${link.route}`} key={index}
                      className={`w-full cursor-pointer block py-2 px-2 
                        ${isActive && 'lg:bg-gray-200 lg:rounded-lg'}`}>
                      {LabelElement}
                    </Link>
                  );
                })}
                {/* </Sidebar.ItemGroup>

              <Sidebar.ItemGroup > */}
                <Sidebar.Item className='absolute bottom-0'>
                  <Dropdown className="w-[350px] p-5 cursor-pointer rounded-lg shadow-lg" label=""
                    dismissOnClick={false} placement="top"
                    renderTrigger={() =>
                      <div className='flex items-center justify-start '>
                        <HiMenu className='lg:mr-7 text-xl' />
                        <span className="hidden lg:block">More</span>
                      </div>}>
                    <MoreDropdown position="leftsidebar" />
                  </Dropdown>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>

            {/* <Sidebar.Items className='absolute bottom-2 lg:min-w-[230px]'>
              <Sidebar.ItemGroup>
                <Sidebar.Item>
                  <Dropdown className="w-[350px] p-5 cursor-pointer rounded-lg shadow-lg" label=""
                    dismissOnClick={false} placement="top"
                    renderTrigger={() =>
                      <div className='flex items-center justify-start '>
                        <HiMenu className='lg:mr-7 text-xl'/>
                        <span className="hidden lg:block">More</span>
                      </div>}>
                    <MoreDropdown position="leftsidebar" />
                  </Dropdown>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items> */}
            {/* </div> */}
          </Sidebar>
        </section >
      </aside>

      {isCreatePostOpen &&
        <CreatePost isCreatePostOpen={isCreatePostOpen} setIsCreatePostOpen={setIsCreatePostOpen} />
      }

    </>

  );
}
export default LeftSideBar;