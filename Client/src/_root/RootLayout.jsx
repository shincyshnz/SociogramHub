import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar, LeftSideBar, RightSideBar, BottomBar } from '../components';
import { useAuth } from '../hooks/customHooks';

const RootLayout = () => {
  const navigate = useNavigate();
  const { getToken,userDetails } = useAuth();
  const accessToken = getToken("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [accessToken]);

  console.log(userDetails);

  return (
    <div className='w-full flex flex-col justify-between md:flex-row p-2'>
      <TopBar />
      <LeftSideBar />
      <section className='flex h-[75vh]'>
        <Outlet />
      </section>
      <RightSideBar />
      <BottomBar className="sticky self-end" />

    </div>
  )
}

export default RootLayout