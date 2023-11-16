import { Dropdown } from 'flowbite-react'
import React, { useEffect } from 'react'
import { HiLogout, HiOutlineBookmark, HiOutlineCog, HiOutlineSun } from 'react-icons/hi'
import { useAuth, useError } from '../hooks/customHooks';
import { useNavigate, Link } from 'react-router-dom';
import UserAvatar from './shared/UserAvatar';
import { moreLinks, sidebarLinks } from '../constatnts';

const MoreDropdown = ({ position = "leftside" }) => {
    const { handleError } = useError();
    const { removeToken } = useAuth();
    let profile = sidebarLinks.filter(link => link.label === "Profile");;

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
        <>
            {position === "bottom" && (
                    <Link to={profile[0].route}>
                        <Dropdown.Item>
                            <div className='flex flex-1 gap-3 items-center'>{profile[0].icon} {profile[0].label}</div>
                        </Dropdown.Item>
                    </Link>
                )
            }

            {moreLinks.map((link, index) => {
                return (
                    <Link to={link.route} key={index}>
                        <Dropdown.Item>
                            <div className='flex flex-1 gap-3 items-center'>{link.icon} {link.label}</div>
                        </Dropdown.Item>
                    </Link>
                )
            })}
            
            <Dropdown.Divider />
            <Dropdown.Item icon={HiOutlineSun}>Dark Mode </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={() => handleLogout()}>Log out</Dropdown.Item>
        </>
    )
}

export default MoreDropdown