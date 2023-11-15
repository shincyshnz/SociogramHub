import { Dropdown } from 'flowbite-react'
import React from 'react'
import { HiLogout, HiOutlineBookmark, HiOutlineCog, HiOutlineSun } from 'react-icons/hi'
import { useAuth, useError } from '../hooks/customHooks';
import { useNavigate } from 'react-router';
import { DarkThemeToggle } from 'flowbite-react';


const MoreDropdown = () => {
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
        <>
            <Dropdown.Item icon={HiOutlineCog}>Settings</Dropdown.Item>
            <Dropdown.Item icon={HiOutlineBookmark}>Saved</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiOutlineSun}>Dark Mode </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={() => handleLogout()}>Log out</Dropdown.Item>
        </>
    )
}

export default MoreDropdown