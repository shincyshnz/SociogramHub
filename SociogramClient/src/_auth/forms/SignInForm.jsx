import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader, GetApp } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInAccount } from '../../lib/reactQuery/queriesAndMutations';
import { useAuth, useError } from '../../hooks/customHooks';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm();

  const { handleError, deleteError } = useError();
  const { setUserEmail, storeToken } = useAuth();
  const navigate = useNavigate();
  const {
    mutateAsync: LoginUser,
    isLoading
  } = useSignInAccount();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    deleteError('apiError');
    try {
      if (Object.keys(errors).length > 0) return;

      const response = await LoginUser(data);

      if (!response) {
        handleError('login', { message: "Sign in failed. Please try again." });
      }

      storeToken(response?.data?.accessToken);
      setUserEmail(prev => response?.data?.email);
      navigate("/");

    } catch (error) {
      handleError('apiError', { message: error?.response?.data?.message || error?.message });
    }
  }

  return (
    <>
      <div className='form-container border'>
        <img className="max-w-[85%] px-10 mx-auto" src="/assets/logo.png" alt="logo" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 w-full">
            <FormFields label={"Email"} name={"email"} type={"text"} register={register} errors={errors} setValue={setValue} clearErrors={clearErrors} setError={setError} />
            <FormFields label={"Password"} name={"password"} type={"password"} register={register} errors={errors} setValue={setValue} clearErrors={clearErrors} setError={setError}
            />
          </div>

          <div className="w-full mt-4">
            <button type="submit" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
              {isLoading ? (<Loader />) : <span>Log in</span>}
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="w-[150px] border-b-[1px] border-gray-300"></div>
          <h6 className="font-semibold text-gray-500 text-sm">OR</h6>
          <div className="w-[150px] border-b-[1px] border-gray-300"></div>
        </div>

        <a href="#" className="flex justify-center items-center gap-2 w-full text-blue-800 bg-transparent hover:cursor-pointer font-medium text-sm py-2 mb-3">
          <img className="w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
          <span>Log in With Facebook</span>
        </a>

        {/* <a href="" className="flex justify-center items-center gap-2 w-full text-blue-800 bg-transparent hover:cursor-pointer">
          <span>Forgot Password?</span>
        </a> */}
        <Link to="/forgot-password" className="flex justify-center items-center gap-2 w-full text-blue-800 bg-transparent hover:cursor-pointer">
          <span>Forgot Password?</span>
        </Link>

      </div >

      <div className="form-container w-full border p-6">
        <p className="text-sm">Don't have an account? <Link to="/sign-up">
          <span className="text-blue-600">Sign Up</span>
        </Link>
        </p>
      </div>

      <GetApp />
    </>
  )
}

export default SignInForm