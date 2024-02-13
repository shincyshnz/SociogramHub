import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import { useError } from '../hooks/customHooks';
import { useFollowUsers, useUnFollowUsers } from '../lib/reactQuery/queriesAndMutations';
import UnfollowModal from './UnfollowModal';

const ProfileCard = ({ ...props }) => {
    const { userId, imgUrl, username, subText, text = "follow" } = props;
    const { handleError } = useError();
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Follow User
    const {
        mutateAsync: followUser,
        isPending: isPendingFollow,
        isSuccess: isFollowSuccess,
        error: followError,
    } = useFollowUsers();

    // UnFollow User
    const {
        mutateAsync: unfollowUser,
        isPending: isPendingUnFollow,
        isSuccess: isUnFollowSuccess,
        error: unfollowError,
    } = useUnFollowUsers();

    const handleFollow = async (event) => {
        event.preventDefault();
        try {
            await followUser(userId);

            if (followError) {
                throw new Error(followError);
            }
        } catch (error) {
            handleError('followApiError', { message: error?.response?.data?.message || error?.message });
        }
    }

    const handleUnFollow = async (event) => {
        event.preventDefault();
        console.log("Unfollow clicked");
        try {
            await unfollowUser(userId);
        } catch (error) {
            handleError('followApiError', { message: error?.response?.data?.message || error?.message });
        } finally {
            setIsOpenModal(false);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-3">
                <div className="w-full flex items-center gap-3">
                    <img className="w-12 h-12 p-[2px] rounded-full" src={imgUrl || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt="profile picture" />
                    <div className="flex flex-1 flex-col items-start justify-center">
                        <span className='text-md font-bold'>{username}</span>
                        <span className=' text-gray-600'>{subText}</span>
                    </div>
                    {/* {isFollowSuccess
                        ? <button onClick={() => setIsOpenModal(true)}>
                            <span className='font-bold'>Following</span>
                        </button>
                        : (isPendingFollow
                            ? <Spinner />
                            : <button onClick={handleFollow}>
                                <span className='text-blue-700 font-bold'>{text}</span>
                            </button>
                        )
                    } */}

                    <div>
                        {(isPendingFollow || isPendingUnFollow) && <Spinner />}
                        {isFollowSuccess && <button onClick={() => setIsOpenModal(true)}>
                            <span className={`font-bold ${isUnFollowSuccess && 'hidden'}`}>Following</span>
                        </button>}
                    </div>

                    {<button onClick={handleFollow}>
                        <span className='text-blue-700 font-bold'>{text}</span>
                    </button>}
                </div>
            </div>

            {/* Modal :  Implement HOC : Higher Order Component */}

            {isOpenModal && <UnfollowModal imgUrl={imgUrl} username={username} handleUnFollow={handleUnFollow} setIsOpenModal={setIsOpenModal} />}
        </>
    );
}

export default ProfileCard