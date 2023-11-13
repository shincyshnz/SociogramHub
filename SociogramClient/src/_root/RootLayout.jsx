import React, { useEffect } from 'react'
import { useAuth } from '../hooks/customHooks';
import { Outlet, useNavigate } from 'react-router-dom';
import LeftSidebar from '../components/shared/LeftSidebar';
import RightSidebar from '../components/shared/RightSidebar';
import TopBar from '../components/shared/TopBar';

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
    <div className='w-full md:flex px-3'>
      <TopBar />
      <LeftSidebar />
      <RightSidebar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

    </div>
  )
}

export default RootLayout