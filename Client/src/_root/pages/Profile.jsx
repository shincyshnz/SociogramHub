import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { IoIosSettings } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { IoBookmarkOutline } from 'react-icons/io5';
import { FaTag } from 'react-icons/fa';
import { AiOutlineTable } from 'react-icons/ai';

const Profile = () => {
  const navigate = useNavigate();

  // Accessing profile data from cache
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['profile']);

  useEffect(() => {
    if (!profile?.email) {
      navigate('/sign-in')
    }
  }, [profile]);


  return (
    <div className='profile px-24 py-16'>
      <div className="section--1 w-full flex justify-start gap-8 md:gap-32 px-15">
        <div className="profile-image">
          <img className='w-36 h-36 rounded-full object-contain' src={profile.profile_pic || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt={profile.username} />
        </div>
        <div className="profile-data flex flex-col gap-8 md:text-[16px]">
          <div className="flex-center gap-5">
            <h4>{profile.username}</h4>
            <button className='grey-button'>Edit Profile</button>
            <button className='grey-button'>View Archive</button>
            <IoIosSettings size={'30px'} />
          </div>
          <div className="flex items-center gap-5">
            <p><span className='font-bold'>1</span> post</p>
            <p><span className='font-bold'>217</span> followers</p>
            <p><span className='font-bold'>519</span> following</p>
          </div>
          <div className="text-left">
            <p>{profile.fullname}</p>
          </div>
        </div>
      </div>
      <div className="section--2 flex gap-6 my-10 justify-self-center">
        <div className="flex flex-col items-center font-bold">
          <img className='border border-gray-200 border-spacing-0 p-1 w-24 h-24 rounded-full' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1709901405~exp=1709905005~hmac=c4f410a7eb4de48e3fad6d86ffbe7cc275c174a19d9c5cab271ce741cc354561&w=1380" alt="highlights" />
          <p className='my-2'>Highlights</p>
        </div>
        <div className="flex flex-col items-center font-bold">
          <div className='border border-gray-200 border-spacing-0 p-1 w-24 h-24 rounded-full text-gray-400 text-[40px] flex-center' ><GoPlus /></div>
          <p className='my-2'>New</p>
        </div>
      </div>
      <hr/>
      <div className="section--3 text-[16px] flex-center gap-10">
        <button className='flex gap-1 p-3 border-t-2 border-black'><AiOutlineTable className='text-gray-400' />Posts</button>
        <button className='flex gap-1 p-3 '><IoBookmarkOutline className='text-gray-400'/>Saved</button>
        <button className='flex gap-1 p-3 '><FaTag className='text-gray-400'/>Tagged</button>
      </div>
      <div className="section--4"></div>
    </div>
  );
}

export default Profile