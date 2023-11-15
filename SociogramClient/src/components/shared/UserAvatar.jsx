import React from 'react'
import { useAuth } from '../../hooks/customHooks'
import { Avatar } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

const UserAvatar = () => {
    const { user } = useAuth();
    if (user.profile) {
        return (
            < Avatar size="xs" alt="User Avatar" img={user.profilePic} rounded />
        )
    }

    return (
        <HiUserCircle className='text-2xl text-gray-500'/>
    );
}

export default UserAvatar