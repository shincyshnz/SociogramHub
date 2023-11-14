import React, { useEffect } from 'react'
import { useAuth } from '../hooks/customHooks';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from '../components/shared/TopBar';
import LeftSideBar from '../components/shared/LeftSideBar';
import RightSideBar from '../components/shared/RightSideBar';
import BottomBar from '../components/shared/BottomBar';

const RootLayout = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const accessToken = getToken("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-up");
    }
  }, [accessToken]);

  return (
    <div className='w-full md:flex'>
      <TopBar />
      <LeftSideBar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <RightSideBar />
      <BottomBar />

    </div>
  )
}

export default RootLayout