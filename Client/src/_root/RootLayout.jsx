import { Outlet } from 'react-router-dom';
import { TopBar, LeftSideBar, BottomBar, Loader } from '../components';
import { useGetProfile } from '../lib/reactQuery/queriesAndMutations';
import { useEffect } from 'react';

const RootLayout = () => {

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

          <BottomBar className="self-end" />
        </div>
      }
    </>
  )
}

export default RootLayout