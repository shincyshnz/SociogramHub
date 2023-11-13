import React from 'react'
import { Toast } from 'flowbite-react';
import { HiFire } from 'react-icons/hi';

const NotificationToast = ({ Icon = <HiFire className='h-5 w-5' />, message = "", type = "error" }) => {
  let customStyle = "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg";
  switch (type) {
    case "error":
      customStyle += "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
      break;
    case "info":
      customStyle += "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200";
      break;
    case "success":
      customStyle += "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
      break;

    default:
      break;
  }

  return (
    <Toast className='shadow-lg mb-2'>
      <div className={`${customStyle}`}>
        {Icon}
      </div>
      <div className="mx-2 text-xs font-normal">{message}</div>
      <Toast.Toggle/>
    </Toast>
  );
}

export default NotificationToast