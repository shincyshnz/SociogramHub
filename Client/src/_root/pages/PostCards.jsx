import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoChatbubbleOutline, IoHeartOutline, IoPaperPlaneOutline, IoBookmarkOutline } from 'react-icons/io5';
import emojiData from '@emoji-mart/data'
import emojiPicker from '@emoji-mart/react'
import EmojiPicker from '@emoji-mart/react';

const PostCards = () => {

  // React - hook - form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm();

  const [showMore, setShowMore] = useState(null);
  const [showPostButton, setShowPostButton] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [commentText, setCommentText] = useState("");
  const text = "ajsfhakjsf akjshfjkahsf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf aksjhfjkashfjkashfk akjfhjakshfkjasf akjsfhajkshfjkashf";
  const postId = 2, totalComments = 10;

  const handleShowMore = (postId) => {
    setShowMore(postId);
  }

  const handleChangeComment = (event) => {
    const { value } = event.target;
    (value.length > 0) ? setShowPostButton(true) : setShowPostButton(false);
    setCommentText(value);
  }

  const addEmoji = (event) => {
    const code = event.unified.split("_");
    console.log(code);
    const codeArray = [];
    code.forEach(el => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setCommentText(commentText + emoji)
  }

  return (
    <>
      <div className="w-full flex justify-center items-center px-3 pt-3 pb-20">
        <div className="w-full flex flex-col lg:px-3 gap-2 text-[16px]">
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

          <div className='font-bold mt-1'><span>12,3454 Likes</span></div>

          <div className='inline-block leading-snug text-[16px]'>
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

          {/* Post Comment */}


          <form className='relative border-b-2'>
            <label htmlFor="chat" className="sr-only">Add Comment</label>
            <div className="flex items-center rounded-lg bg-gray-50 dark:bg-gray-700">
              <textarea onFocus={() => setShowEmoji(false)} id="chat" value={commentText} rows="1" onChange={handleChangeComment} className="block  resize-none w-full text-sm text-gray-900 bg-white rounded-lg border-0 focus:ring-0 focus:border-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0" placeholder="Add Comment..."></textarea>
              {showPostButton && (
                <>
                  <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer dark:text-blue-500 ">
                    Post
                  </button>
                  <div>
                    <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-900 rounded-lg cursor-pointer dark:text-gray-400 ">
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                      </svg>
                    </button>
                  </div>

                </>
              )}
            </div>
            {showEmoji &&
          <div className="absolute right-1 z-[60]">
            <EmojiPicker showPreview={0} data={emojiData} onEmojiSelect={addEmoji} emojiSize={20} theme="light" previewPosition="none" />
          </div>}
          </form>


        </div>
      </div>


    </>
  )
}

export default PostCards