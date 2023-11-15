import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { HiHome, HiFilm, HiPlus, HiChatAlt2 } from 'react-icons/hi';
import { MdOutlineExplore } from 'react-icons/md';
import MoreDropdown from '../MoreDropdown';
import UserAvatar from './UserAvatar';

const BottomBar = () => {
  return (
    <Navbar fluid rounded className='visible md:hidden'>
      <Navbar className='text-xl w-full'>
        <Navbar.Link href="/"><HiHome className='text-gray-500'/></Navbar.Link>
        <Navbar.Link href="#"><MdOutlineExplore className='text-gray-500'/></Navbar.Link>
        <Navbar.Link href="#"><HiFilm className='text-gray-500'/></Navbar.Link>
        <Navbar.Link href="#"><HiPlus className= 'text-gray-500 border-2 border-gray-500 rounded-md' /></Navbar.Link>
        <Navbar.Link href="#"><HiChatAlt2 className='text-gray-500'/></Navbar.Link>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <UserAvatar />
          }>
          <MoreDropdown />
        </Dropdown>
      </Navbar>
    </Navbar>
  );
}
export default BottomBar