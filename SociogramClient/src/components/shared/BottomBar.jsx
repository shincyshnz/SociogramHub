import { Dropdown, Navbar } from 'flowbite-react';
import UserAvatar from './UserAvatar';
import { sidebarLinks } from '../../constatnts';
import MoreDropdown from '../MoreDropdown';

const BottomBar = () => {
  return (
    <Navbar fluid rounded className='visible md:hidden border-t-2 p-0'>
      <Navbar className='text-xl w-full'>

        {sidebarLinks.map((link, index) => {
          if (["Search", "Notifications", "Profile"].includes(link.label)) return;

          return <Navbar.Link key={index} href={link.route}>{link.icon}</Navbar.Link>
        })}

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <UserAvatar />
          }>
          <MoreDropdown position="bottom" />
        </Dropdown>
      </Navbar>
    </Navbar>
  );
}
export default BottomBar