import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader } from '../../components/index';
import { Link } from 'react-router-dom';
import GetApp from '../../components/GetApp';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError
  } = useForm();
  const [isLoading, setIsloading] = useState(false);

  const onSubmit = (data, e) => {
    e.preventDefault();
    setIsloading(true);

    console.log(data);
  }

  return (
    <>
      <div className='form-container border'>
        <img className="max-w-[85%] px-10 mx-auto" src="/assets/logo.png" alt="logo" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 w-full">
            <FormFields label={"Email"}
              name={"email"}
              type={"text"}
              register={register}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
              setError={setError}
            />
            <FormFields
              label={"Password"}
              name={"password"}
              type={"password"}
              register={register}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
              setError={setError}
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

        <a href="#" className="flex justify-center items-center gap-2 w-full text-blue-800 bg-transparent hover:cursor-pointer">
          <span>Forgot Password?</span>
        </a>
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