import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar, LeftSideBar, RightSideBar, BottomBar } from '../components';
import { useAuth, useError } from '../hooks/customHooks';
import { getUserDetails } from '../lib/api';

const RootLayout = () => {
  const navigate = useNavigate();
  const { getToken, setUserDetails } = useAuth();
  const { handleError, deleteError } = useError();
  let accessToken;

  const fetchUserDetails = async (accessToken) => {
    try {
      const userData = await getUserDetails(accessToken);
      setUserDetails(prev => prev = userData);
    } catch (error) {
      handleError('apiError', { message: error?.response?.data?.message || error?.message });
    }
  }

  useEffect(() => {
    deleteError("apiError");
    let accessToken = getToken("accessToken");
    if (!accessToken) {
      navigate("/sign-in");
    } else {
      fetchUserDetails(accessToken);
    }
  }, [accessToken]);

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