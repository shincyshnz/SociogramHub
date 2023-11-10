import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { Loader } from '../../components';
import { Link } from 'react-router-dom';

const Otp = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setValue } = useForm();
  const otpInputs = Array.from({ length: 6 }, (_, index) => {
    const inputRef = React.createRef();
    return {
      ref: inputRef,
    };
  });

  const handleChange = (e, index) => {
    let input = e.target;

    if (input.value && input.value > 9) {
      input.value = input.value.slice(-1);
    }
    
    if (input.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].ref.current.focus();
    } else if (!input.value && index > 0) {
      otpInputs[index - 1].ref.current.focus();
    }
    setValue(input.name, input.value);

  };


  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    const otp = Object.values(data).join("");
    console.log(otp);

  };

  return (
    <div className='form-container border'>
      <h6 className="mb-4 font-bold text-base">OTP has been sent to your registered email {state.email}.</h6>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        {otpInputs.map((input, index) => (
          <input
            key={index}
            type="number"
            ref={input.ref}
            name={`otp${index + 1}`}
            maxLength="1"
            {...input}
            className="w-12 h-12 border rounded text-center mx-1 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange(e, index)}
          />
        ))}

        <div className="w-full mt-4 text-left">
          <button disabled={isLoading} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 ">
            {isLoading ? (<Loader />) : "Submit"}
          </button>
          <Link to="/resend-otp" className="text-blue-600">
            <span>Resend OTP</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Otp;




