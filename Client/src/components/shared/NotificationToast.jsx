import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";


//Notification Toast
const NotificationToast = ({ Icon = <HiFire className='h-5 w-5' />, message = "", type = "error" }) => {
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

export default NotificationToast