import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader, GetApp, OR } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInAccount } from '../../lib/reactQuery/queriesAndMutations';
import { useAuth, useError } from '../../hooks/customHooks';

const SignInForm = () => {
  const navigate = useNavigate();
  const { handleError, deleteError } = useError();
  const { setUserDetails, storeToken } = useAuth();

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm();

  // React-Query : Login
  const {
    mutateAsync: LoginUser,
    isPending: isLoading,
  } = useSignInAccount();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    deleteError('apiError');

    try {
      const response = await LoginUser(data);
      if (response.status === 200) {
        storeToken(response?.data?.accessToken);
        // localStorage.setItem("userDetails",{...response?.data?.user});
        setUserDetails(prev => prev = response?.data?.user);
        navigate("/");
      }

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

        <OR />

        <a href="#" className="flex justify-center items-center gap-2 w-full text-blue-800 bg-transparent hover:cursor-pointer font-medium text-sm py-2 mb-3">
          <img className="w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
          <span>Log in With Facebook</span>
        </a>

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