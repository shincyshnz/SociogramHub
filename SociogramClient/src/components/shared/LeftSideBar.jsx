import { Dropdown, Sidebar } from 'flowbite-react';
import { HiHome, HiOutlineSearch, HiFilm, HiOutlineHeart, HiMenu, HiPlus, HiLogout, HiOutlineCog, HiOutlineSun, HiOutlineBookmark, HiChatAlt2 } from 'react-icons/hi';
import { MdOutlineExplore } from 'react-icons/md';
import MoreDropdown from '../MoreDropdown';
import { useAuth } from '../../hooks/customHooks';
import UserAvatar from './UserAvatar';

const LeftSideBar = () => {
  const { user } = useAuth();

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
                <Sidebar.Item href="#" icon={HiChatAlt2}>
                  Messages
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiOutlineHeart}>
                  Notifications
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiPlus}>
                  Create
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={UserAvatar}>
                  Profile
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item>
                <Dropdown className="w-[200px] cursor-pointer" label="" dismissOnClick={false} placement="top" renderTrigger={() => <div className='flex items-center justify-start'><HiMenu className='mr-2 text-gray-600 text-2xl' /><span>More</span> </div>}>
                  <MoreDropdown position="leftsidebar" />
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