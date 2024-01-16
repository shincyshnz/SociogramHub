import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar, LeftSideBar, RightSideBar, BottomBar } from '../components';
import { useAuth, useError } from '../hooks/customHooks';

const RootLayout = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { deleteError } = useError();
  let accessToken;

  useEffect(() => {
    deleteError("apiError");
    accessToken = getToken("accessToken");
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [accessToken]);
  // }, []);

  return (
    <>
      <div className='w-full max-h-screen flex flex-col md:flex-row'>
        <TopBar />
        <aside id="default-sidebar" class="hidden md:block fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <LeftSideBar />
        </aside>
        {/* <section className='flex h-[75vh]'> */}
        <div className='w-full h-full flex justify-center md:ml-16 lg:ml-64 md:px-4 scroll-smooth'>
          <section className='w-full h-full'>
            <Outlet />
          </section>
          <RightSideBar />
        </div>
        <BottomBar className="self-end" />
      </div>
    </>
  )
}

export default RootLayout