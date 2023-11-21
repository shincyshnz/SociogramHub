import React from 'react'
import { useAuth } from '../../hooks/customHooks'
import { Avatar } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

const UserAvatar = ({size = "25px"}) => {
    const { userDetails } = useAuth();
    if (userDetails.profile_pic) {
        return (
            <Avatar size={size} alt="User Avatar" img={userDetails.profile_pic} rounded />
        )
    }

    return (
        <HiUserCircle size={size} className='text-gray-900 opacity-90' />
    );
}

export default UserAvatar