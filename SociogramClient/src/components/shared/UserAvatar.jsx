import React from 'react'
import { useAuth } from '../../hooks/customHooks'
import { Avatar } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

const UserAvatar = () => {
    const { userDetails } = useAuth();
    if (userDetails.profile_pic) {
        return (
            <Avatar size="xs" alt="User Avatar" img={userDetails.profile_pic} rounded />
        )
    }

    return (
        <HiUserCircle className='text-gray-900 opacity-80' />
    );
}

export default UserAvatar