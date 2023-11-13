import React from 'react'
import { Label, Navbar, TextInput } from 'flowbite-react';
import { HiSearch, HiOutlineHeart } from 'react-icons/hi';

const TopBar = () => {
    return (
        <Navbar fluid rounded className='visible sm:hidden'>
            <Navbar.Brand href="#">
                <img src="/assets/logo.png" className="mr-3 h-9 sm:h-9" alt="Logo" />
            </Navbar.Brand>
            <TextInput className="w-[250px]" id="search" type="Search" icon={HiSearch} placeholder="Search" sizing="md" />
            <HiOutlineHeart id="Notifications" className='mx-2 text-3xl'/>
        </Navbar>
    );
}

export default TopBar