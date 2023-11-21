import React, { useState } from 'react'
import { FormFields, UserAvatar } from '../../components';
import { useAuth } from '../../hooks/customHooks';
import { useForm } from 'react-hook-form';
import { Select, Textarea } from 'flowbite-react';
import TagSearchBar from '../../components/TagSearchBar';

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
            className="border-0 focus:border-transparent focus:ring-0"
            {...register("post")}
            placeholder='Write a caption...'
            maxLength={2200}
            name="post"
            id="post"
            onChange={handleChange}
            rows={10}
          />
          <div className='relative mb-3'>
            <span className='absolute right-1'>{charLength}/2,200</span>
          </div>
          <FormFields
            className="border-none focus:ring-0"
            label={"Add Location"}
            name={"location"}
            type={"text"}
            register={register}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
          <TagSearchBar/>
          
        </div>
      </div>
    </div>
  )
}

export default Home