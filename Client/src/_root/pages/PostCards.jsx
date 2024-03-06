import React, { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AddCommentForm, Loader } from '../../components';
import { IoChatbubbleOutline, IoHeartOutline, IoPaperPlaneOutline, IoBookmarkOutline } from 'react-icons/io5';
import { useAddComments, useGetPosts, useGetProfile } from '../../lib/reactQuery/queriesAndMutations';


const PostCards = () => {
  const [showMore, setShowMore] = useState(null);
  const [comments, setComments] = useState([]);

  // Fetch profile data : React Query
  const {
    data: profile,
    isPending: isPendingProfile,
  } = useGetProfile();

  // Fetch posts : React Query
  const {
    data: posts,
    isPending: isPendingPosts,
    isError: isErrorPosts,
    error: postsError,
  } = useGetPosts();

  // Add Comments : React Query
  const {
    mutateAsync: addComments,
    isError: isErrorAddComment,
    error: errorAddComment,
  } = useAddComments();

  // Show more of post title
  const handleShowMore = (postId) => {
    setShowMore(postId);
  }

  if (isPendingProfile) {
    return (<div className="h-full w-full mt-[25%] flex-center">
      <Loader size={"xl"} /></div>);
  }

  if (isErrorAddComment) {
    console.log(errorAddComment);
  }

  let postContent = (post, index) => {
    return (
      <div key={index} className="w-full flex-center px-5 pt-3 pb-20">
        <div className="w-full md:w-[80%] flex flex-col gap-1 lg:px-3 lg:gap-2 text-[16px]">
          <div className="flex justify-start items-center">
            <div className="flex justify-start items-center w-full">
              <div className="rounded-full p-[2px] bg-gradient-to-t from-[#f4d254] via-[#f33c88] to-[#f381d4]">
                <div className="rounded-full bg-white dark:bg-black back">
                  <a href='#'>
                    <img className="w-10 h-10 p-[2px] rounded-full" src={profile?.imgUrl || "https://flowbite.com/docs/images/carousel/carousel-1.svg"} alt="profile image" />
                  </a>
                </div>
              </div>
              <div className='flex flex-col p-2'>
                <span className='font-bold text-[14px]'>{post?.username} <span className='text-gray-500'>. 1 h</span></span>
                <span>{post?.location} </span>
              </div>
            </div>
            <HiOutlineDotsHorizontal size={"18px"} />
          </div>

          <div className='flex justify-center rounded-sm outline outline-1 shadow-sm bg-black'>
            <img className='max-h-[500px] object-contain' src={post.postFile} alt="post" />
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

          <div className='font-bold mt-1'><span>{(post.likes > 0) && `${post.likes} Likes`}</span></div>

          <div className='inline-block leading-snug text-[16px]'>
            <span className='font-bold mr-1'>{post.username}</span>
            <span className="">
              {showMore ? post.caption : post.caption.substring(0, 250)}
            </span>
            {!showMore &&
              <button onClick={() => handleShowMore(post._id)}>
                <span>...</span>
                <span className='text-gray-600'>more</span>
              </button>}
          </div>

          <div>
            <span className='text-gray-600'>{(post.commentsCount > 0) && `View all ${post.commentsCount} comments`}</span>
          </div>

          {/* Post Comment  - Form*/}
          <AddCommentForm
            post={post}
            index={index}
            addComments={addComments}
            setComments={setComments}
          />

        </div>
      </div>)
  }
  console.log(comments, "==comments");
  return (
    posts ? posts.map((post, index) => postContent(post, index)) : 'No Posts'
  )
}

export default PostCards