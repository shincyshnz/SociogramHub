import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { Loader } from '../../components';
import { Link } from 'react-router-dom';
import { VerifyOtpAPI } from '../../lib/api';
import { useError } from '../../hooks/customHooks';
import { useGenerateOtp } from '../../lib/reactQuery/queriesAndMutations';

const Otp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setValue, resetField } = useForm();
  const { handleError, deleteError } = useError();
  const otpInputs = Array.from({ length: 6 }, (_, index) => {
    const inputRef = React.createRef();
    return {
      ref: inputRef,
    };
  });

  const {
    mutateAsync: GenerateOtpAPI,
    isPending,
    isError,
  } = useGenerateOtp();

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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    const otp = Object.values(data).join("");

    try {
      const response = await VerifyOtpAPI({ email: state.email, otp });
      if (response.status == 200) {
        navigate("/reset-password", { state: { email: state.email } });
      }
    } catch (error) {
      handleError('verifyOtp', { message: error?.response?.data?.message || "OTP verification failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    deleteError('apiError');
    try {
      if (!state.email) return;

      const response = await GenerateOtpAPI({ email: state.email });

      if (isError) {
        handleError('changePassword', { message: "Please try again." });
      }
      if (response) {
        otpInputs.map((_, index) => {
          setValue(`otp${index + 1}`, '');
        })
      }

    } catch (error) {
      handleError('apiError', { message: error?.response?.data?.message || error?.message });
    }
  }

  useEffect(() => {
    if (!state) {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <div className='form-container border'>
      <h6 className="mb-4 font-bold text-base">OTP has been sent to your registered email {state?.email}.</h6>

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
          <div className='flex gap-5'>
            <button className="text-blue-600" onClick={handleResendOTP}>Resend OTP</button>
            {isPending && <Loader text="Sending OTP"/>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Otp;




