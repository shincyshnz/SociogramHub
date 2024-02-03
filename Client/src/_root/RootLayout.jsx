import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar, LeftSideBar, RightSideBar, BottomBar } from '../components';
import { useAuth, useError } from '../hooks/customHooks';

const RootLayout = () => {
  let accessToken;
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { deleteError } = useError();

  useEffect(() => {
    deleteError("apiError");
    accessToken = getToken("accessToken");
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [accessToken]);

  return (
    <>
      <div className='w-full max-h-screen flex flex-col md:flex-row'>
        <TopBar />
        <LeftSideBar />

        <div className='w-full h-full flex justify-center md:ml-16 lg:ml-64 scroll-smooth'>
          <section className='w-full h-full'>
            <Outlet />
          </section>
        </div>

        <BottomBar className="self-end" />
      </div>
    </>
  )
}

export default RootLayout