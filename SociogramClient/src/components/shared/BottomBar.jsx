import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { HiHome, HiUserCircle, HiGlobeAlt, HiFilm, HiPlus, HiChatAlt2 } from 'react-icons/hi'
const BottomBar = () => {
  return (
    <Navbar fluid rounded className='visible md:hidden'>
      <Navbar className='text-xl w-full'>
        <Navbar.Link href="/"><HiHome /></Navbar.Link>
        <Navbar.Link href="#"><HiGlobeAlt /></Navbar.Link>
        <Navbar.Link href="#"><HiFilm /></Navbar.Link>
        <Navbar.Link href="#"><HiPlus className='border-2 border-gray-600 rounded-md' /></Navbar.Link>
        <Navbar.Link href="#"><HiChatAlt2 /></Navbar.Link>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </Navbar>
      {/* <div className="flex md:order-2"> */}

      {/* </div> */}
    </Navbar>
  );
}
export default BottomBar