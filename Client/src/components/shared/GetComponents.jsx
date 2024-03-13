import { Avatar, Spinner, Toast } from 'flowbite-react';
import { HiFire, HiUserCircle } from 'react-icons/hi';
import { useAuth } from '../../hooks/customHooks';

// Loader
export const Loader = ({ text = "Loading...", size = "sm" }) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-2">
            <Spinner size={size} /> {text}
        </div>
    )
}


// User AVatar Icon
export const UserAvatar = ({size = "25px"}) => {
    const { userDetails } = useAuth();
    if (userDetails.profile_pic) {
        return (
            <Avatar size={size} alt="User Avatar" img={userDetails.profile_pic} />
        )
    }

    return (
        <HiUserCircle size={size}/>
    );
}

//Notification Toast
export const NotificationToast = ({ Icon = <HiFire className='h-5 w-5' />, message = "", type = "error" }) => {
  const colors = {
    'error': 'red',
    'info': 'orange',
    'success': 'green',
  };

  const toastColor = `text-${colors[type]}-500 dark:text-${colors[type]}-200`;

  return (
    <Toast className='absolute right-4 shadow-lg mb-2 mt-10 z-50 bg-blue-100'>
      <div className={`${'custom-toast ' + toastColor}`}>
        {Icon}
      </div>
      <div className={`${'mx-2 text-xs font-light ' + toastColor}`}>{message}</div>
      <Toast.Toggle />
    </Toast>
  );
}