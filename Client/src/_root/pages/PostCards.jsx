import React from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleOutline, IoHeartOutline, IoPaperPlaneOutline, IoBookmarkOutline } from "react-icons/io5";

const PostCards = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col md:px-3 gap-2 md:min-w-[612px] p-2">
          <div className="flex justify-start items-center">
            <div className="flex justify-start items-center w-full">
              <div className="rounded-full p-[2px] bg-gradient-to-t from-[#f4d254] via-[#f33c88] to-[#f381d4]">
                <div className="rounded-full back">
                  <a href='#'>
                    <img className="w-10 h-10p-[2px] rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
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
          <div className='w-full flex justify-center rounded-sm outline outline-1 shadow-sm bg-black'>
            <img className='max-h-[500px] object-contain' src="assets/food-1.jpg" alt="post" />
          </div>

          <div className="flex text-[27px] pt-2 justify-between">
            <div className="flex gap-4">
              <IoHeartOutline />
              <IoChatbubbleOutline />
              <IoPaperPlaneOutline />
            </div>
            <div>
              <IoBookmarkOutline className='justify-self-end' />
            </div>
          </div>

          <div className='font-bold'><span>12,3454 Likes</span></div>

          <div className='max-w-screen-md'>
            <span className='font-bold px-2'>Post Username</span>
            <div class="max-w-prose mx-auto my-4">
              <p class="text-base overflow-hidden line-clamp-3">Your long paragraph goes here...</p>
              <button class="text-blue-500 hover:underline focus:outline-none" id="toggleBtn">Read more</button>
            </div>

          </div>

        </div>
      </div>






      <div className="flex justify-center items-center">
        <div className="flex flex-col md:px-3 gap-2 max-w-[612px] p-2">
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
          <div className='rounded-sm outline outline-1 shadow-sm'>
            <img className='object-contain' src="assets/food-2.jpg" alt="post" />
          </div>

          <div className="flex text-[27px] pt-2 justify-between">
            <div className="flex gap-4">
              <IoHeartOutline />
              <IoChatbubbleOutline />
              <IoPaperPlaneOutline />
            </div>
            <div>
              <IoBookmarkOutline className='justify-self-end' />
            </div>
          </div>

          <div className='font-bold'><span>12,3454 Likes</span></div>

          <div className='max-w-screen-md'>
            <span className='font-bold px-2'>Post Username</span>
            <div class="max-w-prose mx-auto my-4">
              <p class="text-base overflow-hidden line-clamp-3">Your long paragraph goes here...</p>
              <button class="text-blue-500 hover:underline focus:outline-none" id="toggleBtn">Read more</button>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default PostCards