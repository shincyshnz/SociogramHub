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
    <div className='w-full flex flex-col md:flex-row'>
      <TopBar />
      <LeftSideBar />
      {/* <section className='flex h-[75vh]'> */}
      <div className='w-full h-full flex justify-center gap-3 px-2 md:px-4'>
        <section className='w-full h-full'>
          <Outlet />
        </section>
        <RightSideBar />
      </div>
      <BottomBar className="self-end" />
    </div>
  )
}

export default RootLayout