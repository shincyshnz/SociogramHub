import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiHome, HiOutlineSearch, HiUserCircle, HiFilm, HiOutlineHeart, HiInbox, HiMenu, HiPlus } from 'react-icons/hi';
import { MdOutlineExplore } from 'react-icons/md';

const LeftSideBar = () => {
  return (
    <section className='hidden md:block'>
      <Sidebar aria-label="Sidebar with content separator example">
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
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiMenu}>
              More
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </section>

  );
}
export default LeftSideBar;