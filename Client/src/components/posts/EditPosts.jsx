import React, { useState } from 'react'
import WithModal from '../ModalContainer'
import DeletePosts from './DeletePosts';

const EditPosts = ({ modalContainer, post, setOpenEditPostModal }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <>
            <div className='overflow-hidden flex flex-col justify-center w-[400px] h-[160px] bg-white rounded-md'>
                <button className='p-3'>Edit</button>
                <button onClick={() => setOpenDeleteModal(true)} className='p-3 border-t-2 text-red-600'>Delete</button>
                <button onClick={() => setOpenEditPostModal(false)} className='p-3 border-t-2'>Cancel</button>
            </div>
            {openDeleteModal && <DeletePosts
                postId={post._id}
                setOpenDeleteModal={setOpenDeleteModal}
            />}
        </>

    )
}

export default WithModal(EditPosts)