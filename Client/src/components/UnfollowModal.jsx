import WithModal from "./ModalContainer";

// Use HOC Modal Container
const UnfollowModalBody = ({ imgUrl, username, handleUnFollow, setIsOpenModal, modalContainerClassName }) => {
    return (
        <>
            <div className="flex-center flex-col text-md">
                <img className="w-12 h-12 p-[2px] rounded-full" src={imgUrl || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt="profile picture" />
                <p className='p-3'>{`Unfollow ${username} ?`}</p>
                <button className='unfollow-modal-btn text-red-600' onClick={handleUnFollow}>Unfollow</button>
                <button className='unfollow-modal-btn' onClick={() => setIsOpenModal(false)}>Cancel</button>
            </div>
        </>)
}

export default WithModal(UnfollowModalBody);