import { useState } from 'react';
import { FormFields, Loader } from './index'

const SignUp = ({
  register,
  handleSubmit,
  setValue,
  clearErrors,
  setError,
  errors,
  setIsNext,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const onSubmit = (data, e) => {
    e.preventDefault();
    setIsloading(true);
    setIsNext(true);
  }

  return (
    <>
      <div className="form-container border">
        <img className="max-w-[85%] px-10 mx-auto" src="/assets/logo.png" alt="logo" />

        <h6 className="text-gray-500 mb-4 font-bold text-base">Sign up to see photos and videos from your friends.</h6>
        <a href="#" className="flex justify-center items-center gap-2 w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm py-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700">
          <img className="bg-white w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
          <span>Log in With Facebook</span>
        </a>
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="w-[150px] border-b-[1px] border-gray-300"></div>
          <h6 className="font-semibold text-gray-500 text-sm">OR</h6>
          <div className="w-[150px] border-b-[1px] border-gray-300"></div>
        </div>

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
            label={"Full Name"}
            name={"fullname"}
            type={"text"}
            register={register}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
          <FormFields
            label={"Username"}
            name={"username"}
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

        <div className="px-3 py-2 text-gray-500">
          <p className="mb-3">People who use our service may have uploaded your contact information to sociogramhub. <span className="text-blue-900">Learn More</span></p>
          <p>By signing up, you agree to our <span className="text-blue-900">Terms , Privacy Policy <span className="text-gray-500">and</span> Cookies Policy .</span></p>
        </div>

        <div className="w-full">
          <button type="submit" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
            {isLoading ? (<Loader />) : <span>Sign Up</span>}
          </button>
        </div>
      </div >

    </>
  )
}

export default SignUp