import React from 'react'
import { Navbar, TextInput } from 'flowbite-react';
import { HiSearch, HiOutlineHeart } from 'react-icons/hi';

const TopBar = () => {
    return (
        <Navbar fluid rounded className='visible md:hidden'>
            <div className='flex flex-1 justify-between items-center gap-1'>
                <img src="/assets/logoIcon.png" className="h-9" alt="Logo" />
                <div className='flex items-center'>
                <TextInput className="mx-2" id="search" type="Search" icon={HiSearch} placeholder="Search" sizing="md" />
                <HiOutlineHeart id="Notifications" className='mx-2 text-3xl' />
                </div>
            </div>
        </Navbar>
    );
}

export default TopBar