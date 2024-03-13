import WithModal from "../HOC/ModalContainer"

const DeletePosts = ({ postId, setOpenDeleteModal, setOpenEditPostModal }) => {
    const handleDeletePost = (e) => {
        e.preventDefault();

        try {
            console.log(postId);
        } catch (error) {
            console.log(error);
        } finally {
            setOpenDeleteModal(false);
            setOpenEditPostModal(false);
        }

    }

    return (
        <div className='overflow-hidden flex flex-col items-center justify-center gap-8 w-[400px] h-[160px] bg-white rounded-md'>
            <p>Are you sure you want to delete the post?</p>
            <div className="flex-center gap-8 text-white">
                <button onClick={() => setOpenDeleteModal(false)} className="w-[100px] bg-gray-300 p-3 border-1 rounded-md">Cancel</button>
                <button onClick={handleDeletePost} className="w-[100px] bg-red-500 p-3 border-1 rounded-md">yes</button>
            </div>
        </div >
    )
}

export default WithModal(DeletePosts)