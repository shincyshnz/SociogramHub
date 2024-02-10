import WithModal from "./ModalContainer";

// Use HOC Modal Container
const UnfollowModalBody = ({ imgUrl, username }) => {
    return (
        <>
            <img className="w-12 h-12 p-[2px] rounded-full" src={imgUrl || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt="profile picture" />
            <div className="flex flex-1 flex-col items-start justify-center">
                <span className='text-md font-bold'>{username}</span>
            </div>
        </>)
}

export default WithModal(UnfollowModalBody);