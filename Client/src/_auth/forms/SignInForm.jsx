import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader, GetApp, OR, GetAuthLinks } from '../../components';
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
    isSuccess,
    error
  } = useSignInAccount();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    deleteError('apiError');

    if (data.email === '' || data.password === '') return;

    try {
      const response = await LoginUser(data);
      if (response.status === 200) {
        storeToken(response?.data?.accessToken);
        setUserDetails(prev => prev = response?.data?.user);
        navigate("/");
      }

    } catch (error) {
      handleError('apiError', { message: error?.response?.data?.message || error?.message });
    }
  }


  return (
    <>
      <div className='form-container pt-8 pb-3 border mt-7'>
        <img className="px-6 pt-1 pb-6 mx-auto" src="/assets/logo.png" alt="logo" />
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

        <a href="#" className="flex-center gap-2 text-blue-800 bg-transparent hover:cursor-pointer font-medium text-sm py-2 mb-3">
          <img className="w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
          <span>Log in With Facebook</span>
        </a>

        <Link to="/forgot-password" className="flex-center gap-2 w-full text-blue-800 bg-transparent hover:cursor-pointer">
          <span>Forgot Password?</span>
        </Link>

      </div >

      <GetAuthLinks
        link={{
          'text': "Don't have an account?",
          'link': '/sign-up'
        }}
        text={'Sign Up'}
      />
      <GetApp />
    </>
  )
}

export default SignInForm