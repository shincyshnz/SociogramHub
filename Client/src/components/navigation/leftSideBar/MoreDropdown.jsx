import { Dropdown } from 'flowbite-react'
import React from 'react'
import { HiLogout, HiOutlineSun, HiMenu } from 'react-icons/hi'
import { useAuth, useError, useTheme } from '../../../hooks/customHooks';
import { useNavigate, Link } from 'react-router-dom';
import { MORE_LINKS, SIDEBAR_LINKS } from '../../../constants';

const MoreDropdown = ({ position = "leftside" }) => {
    const navigate = useNavigate();
    const { themeName, themeToggle } = useTheme();


    const { handleError, clearCustomErrors } = useError();
    const { removeToken, userDetails } = useAuth();

    let profile = SIDEBAR_LINKS.filter(link => link.label === "Profile");;

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
            <Dropdown className="w-[350px] p-5 cursor-pointer rounded-lg shadow-lg" label=""
                dismissOnClick={false} placement="top"
                renderTrigger={() =>
                    <div className='flex items-center justify-start '>
                        <HiMenu className='lg:mr-7 text-xl' />
                        <span className="hidden lg:block">More</span>
                    </div>}>

                {position === "bottom" && (
                    // <Link to={`${profile[0].route}/${userDetails._id}`}>
                    <Dropdown.Item>
                        <Link to={`${profile[0].route}`}>
                            <div className='flex flex-1 gap-3 items-center'>{profile[0].icon} {profile[0].label}</div>
                        </Link>
                    </Dropdown.Item>
                )
                }

                {MORE_LINKS.map((link, index) => {
                    return (
                        <Link to={link.route} key={index}>
                            <Dropdown.Item>
                                <div className='flex flex-1 gap-3 items-center'>{link.icon} {link.label}</div>
                            </Dropdown.Item>
                        </Link>
                    )
                })}

                <Dropdown.Divider />
                <Dropdown.Item icon={HiOutlineSun} onClick={themeToggle}>{themeName === "dark" ? 'Light Mode' : 'Dark Mode' }</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item icon={HiLogout} onClick={() => handleLogout()}>Log out</Dropdown.Item>
            </Dropdown>
        </>
    )
}

export default MoreDropdown