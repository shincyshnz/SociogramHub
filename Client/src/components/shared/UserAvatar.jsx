import { useAuth } from '../../hooks/customHooks';
import { Avatar } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

// User AVatar Icon
const UserAvatar = ({ size = "25px" }) => {
    const { userDetails } = useAuth();
    if (userDetails.profile_pic) {
        return (
            <Avatar size={size} alt="User Avatar" img={userDetails.profile_pic} />
        )
    }

    return (
        <HiUserCircle size={size} />
    );
}

export default UserAvatar