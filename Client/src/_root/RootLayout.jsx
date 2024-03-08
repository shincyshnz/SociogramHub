import { Outlet } from 'react-router-dom';
import { TopBar, LeftSideBar, BottomBar } from '../components';

const RootLayout = () => {

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