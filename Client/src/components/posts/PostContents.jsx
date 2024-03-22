import React, { useEffect, useState } from 'react'
import { getTimeDifference } from '../../lib/utils'
import { useAddComments, useGetProfile } from '../../lib/reactQuery/queriesAndMutations';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoBookmarkOutline, IoChatbubbleOutline, IoHeartOutline, IoPaperPlaneOutline } from 'react-icons/io5';
import AddCommentForm from './AddCommentForm';
import EditPosts from './EditPosts';
import Loader from '../shared/Loader';
import { useQueryClient } from '@tanstack/react-query';

const PostContents = ({ post, index }) => {
    const [showMore, setShowMore] = useState(null);
    const [commentsCount, setCommentsCount] = useState(post.commentsCount);
    const [comments, setComments] = useState([]);
    const [openEditPostModal, setOpenEditPostModal] = useState(false);

    // Fetch profile data : React Query
    // const {
    //     data: profile,
    //     isPending: isPendingProfile,
    // } = useGetProfile();

    // Getting loggedin user details from react query cache
    const queryClient = useQueryClient();
    const profile = queryClient.getQueryData(['profile']);

    // Add Comments : React Query
    const {
        mutateAsync: addComments,
        isSuccess: isAddCommentsSuccess,
        isError: isErrorAddComment,
        error: errorAddComment,
    } = useAddComments();

    // Increment comment count when new comment is added
    useEffect(() => {
        if (isAddCommentsSuccess) {
            setCommentsCount(prev => prev + 1);
        }
    }, [isAddCommentsSuccess]);

    // Error Handling
    // if (isPendingProfile) {
    //     return (<div className="h-full w-full mt-[25%] flex-center">
    //         <Loader size={"xl"} /></div>);
    // }

    if (isErrorAddComment) {
        console.log(errorAddComment);
    }

    // Show more of post title
    const handleShowMore = (postId) => {
        setShowMore(postId);
    }


    return (
        <>
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
                <HiOutlineDotsHorizontal size={"18px"} onClick={() => setOpenEditPostModal(true)} />
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
                <span className='text-gray-600'>{(commentsCount > 0) && `View all ${commentsCount} comments`}</span>
            </div>

            <div>
                <span className='text-gray-600 text-sm'>{getTimeDifference(post.createdAt)}</span>
            </div>

            {/* Post Comment  - Form*/}
            <AddCommentForm
                post={post}
                index={index}
                addComments={addComments}
                setComments={setComments}
            />

            {/* Open Edit Modal */}
            {openEditPostModal && <EditPosts
                setOpenEditPostModal={setOpenEditPostModal}
                post={post}
                profile={profile}
            />}
        </>
    )
}

export default PostContents