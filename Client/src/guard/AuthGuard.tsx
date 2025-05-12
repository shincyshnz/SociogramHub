import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetProfile } from '../lib/reactQuery/queriesAndMutations';
import { BottomBar, LeftSideBar, Loader, TopBar } from '../components';

const AuthGaurd = () => {

  // Fetch Profile Data
  const {
    data: profile,
    isPending: isPendingProfile,
    error: profileError,
  } = useGetProfile();

  useEffect(() => {
    if (profileError) {
      console.log(profileError);
    }
  }, [profile]);

  return (
    <>
      {isPendingProfile ? <Loader /> :
        <div className='w-full min-h-screen flex flex-col md:flex-row'>
          <TopBar />
          <LeftSideBar />

          <div className='w-full h-full flex justify-center md:ml-16 lg:ml-64 scroll-smooth'>
            <section className='w-full h-full'>
              <Outlet />
            </section>
          </div>

          <BottomBar />
        </div>
      }
    </>
  )
}

export default AuthGaurd