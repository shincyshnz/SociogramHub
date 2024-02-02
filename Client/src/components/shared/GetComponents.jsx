import { Link } from 'react-router-dom';
import { Avatar, Spinner, Toast } from 'flowbite-react';
import { HiFire, HiUserCircle } from 'react-icons/hi';
import { useAuth } from '../../hooks/customHooks';

// Sign-in sign-up form components 
export const GetApp = () => {
    return (
        <div className="form-container my-2 text-sm">Get the app.
            <div className="flex justify-center items-center gap-3 mt-2">
                <img className="w-44" src="assets/getItONgoogleplay.png" alt="google play" />
                <img className="w-44" src="assets/getitonPlayStore.png" alt="app store" />
            </div>
        </div>
    )
}

export const GetAuthLinks = ({ link, text }) => {
    return (
        <div className="form-container w-full border p-6">
            <p className="text-sm">${link.text}<Link to={`"${link.link}"`}>
                <span className="text-blue-600">${text}</span>
            </Link>
            </p>
        </div>
    )
}

export const OR = () => {
    return (
        <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-[150px] border-b-[1px] border-gray-300"></div>
            <h6 className="font-semibold text-gray-500 text-sm">OR</h6>
            <div className="w-[150px] border-b-[1px] border-gray-300"></div>
        </div>
    )
}

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