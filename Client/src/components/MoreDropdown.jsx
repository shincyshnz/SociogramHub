import { Dropdown } from 'flowbite-react'
import React from 'react'
import { HiLogout, HiOutlineSun } from 'react-icons/hi'
import { useAuth, useError } from '../hooks/customHooks';
import { useNavigate, Link } from 'react-router-dom';
import { moreLinks, sidebarLinks } from '../constatnts';

const MoreDropdown = ({ position = "leftside" }) => {
    const navigate = useNavigate();
    const { handleError, clearCustomErrors } = useError();
    const { removeToken, userDetails } = useAuth();

    let profile = sidebarLinks.filter(link => link.label === "Profile");;

    const handleLogout = () => {
        try {
            removeToken();
            clearCustomErrors();
            navigate("/sign-in");
        } catch (error) {
            handleError('logout', error.message);
        }
    }

    return (
        <>
            {position === "bottom" && (
                <Link to={`${profile[0].route}/${userDetails._id}`}>
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