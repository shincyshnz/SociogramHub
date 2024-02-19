// import { useState } from 'react';
// import { Spinner } from 'flowbite-react';
// import { useError } from '../hooks/customHooks';
// import { useFollowUsers, useUnFollowUsers } from '../lib/reactQuery/queriesAndMutations';
// import UnfollowModal from './UnfollowModal';
import FollowUnfollowButton from './FollowUnfollowButton';



const ProfileCard = ({ ...props }) => {
    const { userId, imgUrl, username, subText, text = "follow" } = props;
    const userDetails = {
        userId,
        username,
        imgUrl,
    };
    // const { handleError } = useError();
    // const [isOpenModal, setIsOpenModal] = useState(false);
    // const [isShow, setIsShow] = useState(false);
    // // Follow User
    // const {
    //     mutateAsync: followUser,
    //     isPending: isPendingFollow,
    // } = useFollowUsers();

    // // UnFollow User
    // const {
    //     mutateAsync: unfollowUser,
    //     isPending: isPendingUnFollow,
    // } = useUnFollowUsers();

    // const handleFollow = async (event) => {
    //     event.preventDefault();

    //     try {
    //         await followUser(userId);
    //         setIsShow(true);
    //     } catch (error) {
    //         handleError('followApiError', { message: error?.response?.data?.message || error?.message });
    //     }
    // }

    // const handleUnFollow = async (event) => {
    //     event.preventDefault();

    //     try {
    //         await unfollowUser(userId);
    //         setIsShow(false);

    //     } catch (error) {
    //         handleError('followApiError', { message: error?.response?.data?.message || error?.message });
    //     } finally {
    //         setIsOpenModal(false);
    //     }
    // }

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-3">
                <div className="w-full flex items-center gap-3">
                    <img className="w-12 h-12 p-[2px] rounded-full" src={imgUrl || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt="profile picture" />
                    <div className="flex flex-1 flex-col items-start justify-center">
                        <span className='text-md font-bold'>{username}</span>
                        <span className=' text-gray-600'>{subText}</span>
                    </div>

                    {text === 'switch' ? (
                        <button>
                            <span className='font-bold'>{text}</span>
                        </button>)
                        : (text === 'follow')
                            ? <FollowUnfollowButton
                                userDetails={userDetails}
                                btnText={text}
                                spanClass={'text-blue-700 font-bold'}
                            />
                            : text !== 'switch' && <FollowUnfollowButton
                                userDetails={userDetails}
                                btnText={text}
                                spanClass={'font-bold'}
                            />

                    }
                </div>
            </div >

            {/* Modal :  Implement HOC : Higher Order Component */}

            {/* {isOpenModal && <UnfollowModal imgUrl={imgUrl} username={username} handleUnFollow={handleUnFollow} setIsOpenModal={setIsOpenModal} />} */}
        </>
    );
}

export default ProfileCard