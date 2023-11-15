import { Dropdown, Sidebar } from 'flowbite-react';
import { HiHome, HiOutlineSearch, HiUserCircle, HiFilm, HiOutlineHeart, HiInbox, HiMenu, HiPlus, HiLogout, HiOutlineCog, HiOutlineSun, HiOutlineBookmark, HiSun } from 'react-icons/hi';
import { MdOutlineExplore } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useAuth, useError } from '../../hooks/customHooks';

const LeftSideBar = () => {
  const { handleError, deleteError } = useError();
  const { removeToken } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      removeToken();
      navigate("/sign-in");
    } catch (error) {
      handleError('logout', error.message);
    }
  }

  return (
    <section className='hidden md:block'>
      <Sidebar aria-label="Sidebar with content separator example">
        <div className="flex flex-col justify-between h-full">
          <div>
            <Sidebar.Logo href="#" img="/assets/logo.png" imgAlt="SociogramHub logo" />

            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiHome}>
                  Home
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiOutlineSearch}>
                  Search
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={MdOutlineExplore}>
                  Explore
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiFilm}>
                  Reels
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox}>
                  Messages
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiOutlineHeart}>
                  Notifications
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiPlus}>
                  Create
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUserCircle}>
                  Profile
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item>
                <Dropdown className="w-[200px] cursor-pointer" label="" dismissOnClick={false} placement="top" renderTrigger={() => <div className='flex items-center justify-start'><HiMenu className='mr-2 text-gray-600 text-2xl' /><span>More</span> </div>}>
                  <Dropdown.Item icon={HiOutlineCog}>Settings</Dropdown.Item>
                  <Dropdown.Item icon={HiOutlineBookmark}>Saved</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiOutlineSun}>Dark Mode</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiLogout} onClick={() => handleLogout()}>Log out</Dropdown.Item>
                </Dropdown>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </Sidebar>
    </section >

  );
}
export default LeftSideBar;