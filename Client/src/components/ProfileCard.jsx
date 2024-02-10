import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import ModalContainer from './ModalContainer';
import { useError } from '../hooks/customHooks';
import { useFollowUsers } from '../lib/reactQuery/queriesAndMutations';
import UnfollowModal from './UnfollowModal';

const ProfileCard = ({ ...props }) => {
    const { userId, imgUrl, username, subText, text = "follow" } = props;
    const { handleError } = useError();
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Follow User
    const {
        mutateAsync: followUser,
        isPending: isPendingFollowing,
        isSuccess: isFollowSuccess,
        error: followError,
    } = useFollowUsers();

    const handleFollowLink = async (event) => {
        event.preventDefault();
        await followUser(userId);

        if (followError) {
            handleError('followApiError', { message: error?.response?.data?.message || error?.message });
        }
    }

    const handleUnFollowLink = (event) => {
        event.preventDefault();
        console.log("Unfollow clicked");
        // Load the unfollow confirmation modal
        setIsOpenModal(true);
    }
    console.log(isOpenModal);
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-3">
                <div className="w-full flex items-center gap-3">
                    <img className="w-12 h-12 p-[2px] rounded-full" src={imgUrl || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt="profile picture" />
                    <div className="flex flex-1 flex-col items-start justify-center">
                        <span className='text-md font-bold'>{username}</span>
                        <span className=' text-gray-600'>{subText}</span>
                    </div>
                    {isFollowSuccess
                        ? <button onClick={handleUnFollowLink}>
                            <span className='font-bold'>Following</span>
                        </button>
                        : (isPendingFollowing
                            ? <Spinner />
                            : <button onClick={handleFollowLink}>
                                <span className='text-blue-700 font-bold'>{text}</span>
                            </button>
                        )
                    }
                </div>
            </div>

            {/* Modal :  Implement HOC : Higher Order Component */}

            {isOpenModal && <UnfollowModal imgUrl={imgUrl} username={username}/>}
        </>
    );
}

export default ProfileCard