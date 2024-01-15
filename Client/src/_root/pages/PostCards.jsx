import React, { useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleOutline, IoHeartOutline, IoPaperPlaneOutline, IoBookmarkOutline } from "react-icons/io5";

const PostCards = () => {
  const [showMore, setShowMore] = useState(null);
  const text = "ajsfhakjsf akjshfjkahsf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf";
  const postId = 2, totalComments=10;

  const handleShowMore = (postId) => {
    setShowMore(postId);
  }

  return (
    <>
      <div className="w-full flex justify-center items-center px-3 lg:px-[66px] py-3">
        <div className="w-full flex flex-col lg:px-3 gap-2 text-base">
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

          <div className='flex justify-center rounded-sm outline outline-1 shadow-sm bg-black'>
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

          <div className='inline-block'>
            <span className='font-bold mr-1'>Post Username</span>
            <span className="">
              {showMore ? text : text.substring(0, 250)}
            </span>
            {!showMore &&
              <button onClick={() => handleShowMore(postId)}>
                <span>...</span>
                <span className='text-gray-600'>more</span>
              </button>}
          </div>
          
          <div>
          <span className='text-gray-600'>{`View all ${totalComments} comments`}</span>
          </div>

          div
        </div>
      </div>


    </>
  )
}

export default PostCards