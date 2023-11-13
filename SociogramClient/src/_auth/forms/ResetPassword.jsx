import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader } from '../../components';
import { useResetPassword } from '../../lib/reactQuery/queriesAndMutations';
import { useAuth, useError } from '../../hooks/customHooks';
import { GoLock } from 'react-icons/go'
import OR from '../../components/OR';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
    watch,
  } = useForm();

  const { handleError, deleteError } = useError();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    mutateAsync: ResetPasswordAPI,
    isPending: isLoading,
    isError,
  } = useResetPassword();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    // deleteError('apiError');
    try {
      console.log(data);
      // if (Object.keys(errors).length > 0) return;
      // if (!data.email) return;

      // const response = await ChangePassword(data);

      // if (isError) {
      //   handleError('changePassword', { message: "Changing password failed. Please try again." });
      // }
      // if (response) {
      //   navigate("/otp", { state: { email: data.email } });
      // }

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
            {isAuthenticated && <FormFields label={"Current Password"} name={"currentPassword"} type={"text"} register={register} errors={errors} setValue={setValue} clearErrors={clearErrors} setError={setError} />}
            <FormFields watch={watch} label={"New Password"} name={"password"} type={"password"} register={register} errors={errors} setValue={setValue} clearErrors={clearErrors} setError={setError} />
            <FormFields watch={watch} label={"Confirm New Password"} name={"confirmPassword"} type={"password"} register={register} errors={errors} setValue={setValue} clearErrors={clearErrors} setError={setError} />
          </div>
          <div className="w-full mt-4">
            <button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
              {isLoading ? (<Loader />) : <span>Submit</span>}
            </button>
          </div>
        </form>

        <OR />
        <Link to="/sign-up" className="text-sm font-bold" >Create new account</Link>
      </div>

      <div className="form-container w-full border">
        <Link to="/sign-in">
          <span className="text-sm font-bold">Back to login</span>
        </Link>
      </div>
    </>
  )
}

export default ResetPassword