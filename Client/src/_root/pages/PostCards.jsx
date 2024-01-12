import React from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";


const PostCards = () => {
  return (
    <>
      <div className="flex flex-col md:px-14 gap-2 max-w-[612px] p-2">
        <div className="flex justify-start items-center">
          <div className="flex justify-start items-center w-full">
            <div className="rounded-full p-[2px] bg-gradient-to-t from-[#f4d254] via-[#f33c88] to-[#f381d4]">
              <div className="rounded-full bg-white dark:bg-black back">
                <a href='#'>
                  <img className="w-10 h-10 p-[2px] rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                </a>
              </div>
            </div>
            <div className='flex flex-col p-2'>
              <span className='font-bold text-[14px]'>Name <span className='text-gray-500'>. 1 h</span></span>
              <span>place </span>
            </div>
          </div>
          <HiOutlineDotsHorizontal size={"18px"} />
        </div>
        <div className='h-[558px] max-h-[400px] rounded-sm outline outline-1 shadow-sm'>
          <img className='object-contain' src="assets/logo.png" alt="post" />
        </div>
      </div>


    </>
  )
}

export default PostCards