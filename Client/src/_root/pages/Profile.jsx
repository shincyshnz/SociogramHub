import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { IoIosSettings } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { IoBookmarkOutline } from 'react-icons/io5';
import { FaTag } from 'react-icons/fa';
import { AiOutlineTable } from 'react-icons/ai';
import { useGetUserPosts } from '../../lib/reactQuery/queriesAndMutations';

const Button = ({ isActive, handleClick, icon, name }) => {
  return <button name={name} className={`flex gap-1 p-3 ${isActive === name && 'border-t-2 border-black'}`} onClick={handleClick}>{icon}{name}</button>
}

const Profile = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('');

  // React-query : Get all posts of profile 
  const {
    data: userPosts,
    isPendig,
    isError,
    error,
  } = useGetUserPosts();

  // Accessing profile data from cache
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['profile']);
  const userPostsCache = queryClient.getQueryData(['userPosts']);

  useEffect(() => {
    setIsActive('post');

    if (!profile?.email) {
      navigate('/sign-in')
    }
  }, [profile]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsActive(prev => prev = e.target.name);
    console.log(e.target.name);
  }

  return (
    <div className='profile px-4 py-4 md:px-24 md:py-16'>
      <div className="section--1 w-full flex flex-row  justify-start gap-8 md:gap-32 px-15">
        <div className="profile-image">
          <img className='w-10 h-10 md:w-36 md:h-36 rounded-full object-contain' src={profile?.profile_pic || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt={profile.username} />
        </div>
        <div className="profile-data flex flex-col gap-8 md:text-[16px]">
          <div className="flex-center gap-5">
            <h4>{profile?.username}</h4>
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
          <img className='highlight-img-icon' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1709901405~exp=1709905005~hmac=c4f410a7eb4de48e3fad6d86ffbe7cc275c174a19d9c5cab271ce741cc354561&w=1380" alt="highlights" />
          <p className='my-2'>Highlights</p>
        </div>
        <div className="flex flex-col items-center font-bold">
          <div className='highlight-img-icon text-gray-400 text-[40px] flex-center' ><GoPlus /></div>
          <p className='my-2'>New</p>
        </div>
      </div>
      <hr />
      <div className="section--3 text-[16px] flex-center gap-10">

        <Button
          isActive={isActive}
          handleClick={handleClick}
          name="post"
          icon={<AiOutlineTable className='text-gray-400' />}
        />
        <Button
          isActive={isActive}
          handleClick={handleClick}
          name="saved"
          icon={<IoBookmarkOutline className='text-gray-400' />}
        />
        <Button
          isActive={isActive}
          handleClick={handleClick}
          name="tagged"
          icon={<FaTag className='text-gray-400' />}
        />

      </div>
      <div className="section--4 flex-center">
        <div className="flex-center md:flex-start max-w-[782px] gap-4 flex-wrap mt-7">
          {isPendig ? "Loading..." : (
            userPostsCache?.map((item, index) => (
              <div key={index} className='flex w-[250px] h-[250px] object-contain bg-black'>
                <img src={item.postFile} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile