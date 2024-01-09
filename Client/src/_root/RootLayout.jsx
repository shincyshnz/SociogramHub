import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar, LeftSideBar, RightSideBar, BottomBar } from '../components';
import { useAuth, useError } from '../hooks/customHooks';

const RootLayout = () => {
  const navigate = useNavigate();
  const { getToken} = useAuth();
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
    <div className='w-full flex flex-col justify-between md:flex-row'>
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