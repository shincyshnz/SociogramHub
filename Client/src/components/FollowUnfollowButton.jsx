import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import { useError } from '../hooks/customHooks';
import { useFollowUsers, useUnFollowUsers } from '../lib/reactQuery/queriesAndMutations';
import UnfollowModal from './UnfollowModal';

const FollowUnfollowButton = ({ ...props }) => {
    const { btnClass = '', btnText, spanClass, userDetails } = props;
    const { handleError } = useError();
    const [isShow, setIsShow] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Follow User
    const {
        mutateAsync: followUser,
        isPending: isPendingFollow,
    } = useFollowUsers();

    // UnFollow User
    const {
        mutateAsync: unfollowUser,
        isPending: isPendingUnFollow,
    } = useUnFollowUsers();

    const handleFollow = async (event) => {
        event.preventDefault();

        try {
            await followUser(userDetails.userId);
            setIsShow(true);
        } catch (error) {
            handleError('followApiError', { message: error?.response?.data?.message || error?.message });
        }
    }

    const handleUnFollow = async (event) => {
        event.preventDefault();

        try {
            await unfollowUser(userDetails.userId);
            setIsShow(false);
        } catch (error) {
            handleError('UnfollowApiError', { message: error?.response?.data?.message || error?.message });
        } finally {
            setIsOpenModal(false);
        }
    }

    return <>
        {(isPendingFollow || isPendingUnFollow) ? <Spinner /> : <button onClick={(e) => isShow ? setIsOpenModal(true) : handleFollow(e)}>
            <span className={isShow ? 'font-bold' : spanClass}>{isShow ? 'Following' : 'Follow'}</span>
        </button>}
        {/* Modal :  Implement HOC : Higher Order Component */}

        {isOpenModal && <UnfollowModal imgUrl={userDetails.imgUrl} username={userDetails.username} handleUnFollow={handleUnFollow} setIsOpenModal={setIsOpenModal} />}
    </>
}

export default FollowUnfollowButton