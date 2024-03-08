import React, { useState } from 'react'
import WithModal from '../ModalContainer'
import DeletePosts from './DeletePosts'
import { useQueryClient } from '@tanstack/react-query'

const EditPosts = ({ modalContainer, post, setOpenEditPostModal, profile }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <>
            <div className='overflow-hidden flex flex-col justify-center w-[400px] py-3 bg-white rounded-md'>
                <button className='p-3'>Go to posts</button>
                {profile._id === post.userId && (
                    <>
                        <button className='p-3   border-t-2'>Edit</button>
                        <button onClick={() => setOpenDeleteModal(true)} className='p-3 border-t-2 text-red-600'>Delete</button>
                    </>
                )}
                <button onClick={() => setOpenEditPostModal(false)} className='p-3 border-t-2'>Cancel</button>
            </div >
            {openDeleteModal && <DeletePosts
                postId={post._id}
                setOpenDeleteModal={setOpenDeleteModal}
                setOpenEditPostModal={setOpenEditPostModal}
            />
            }
        </>

    )
}

export default WithModal(EditPosts)