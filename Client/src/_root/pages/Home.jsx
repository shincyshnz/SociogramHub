import React, { useState } from 'react'
import { UserAvatar } from '../../components';
import { useAuth } from '../../hooks/customHooks';
import { useForm } from 'react-hook-form';
import { Textarea } from 'flowbite-react';

const Home = () => {
  const { userDetails } = useAuth();
  const [charLength, setCharLength] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setCharLength(prev => prev = value.length);
  }

  return (
    <div className='w-full'>Home
      <div className="flex justify-content items center px-2">
        <h5 className="p-2 mx-auto text-lg">Create new post</h5>
        <button className="text-blue-700 font-bold">Share</button>
      </div>
      <div className="w-full flex flex-1 justify-center gap-3">
        <img src="/assets/logoIcon.png" alt="post" className="w-1/2 h-[350px] object-scale-up" />
        <div className="w-full flex flex-1 flex-col gap-3">
          <div className="flex items-center">
            <UserAvatar size="40px" />
            <span className='text-black font-bold mx-2'>{userDetails?.username}</span>
          </div>

          <Textarea
            className="border-0 focus:border-transparent focus:ring-gray-600"
            {...register("post")}
            placeholder='Write a caption...'
            maxLength={2200}
            name="post"
            id="post"
            onChange={handleChange}
            rows={10}
          />
          <div className='relative'>
          <span className='absolute right-1'>{charLength}/2,200</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home