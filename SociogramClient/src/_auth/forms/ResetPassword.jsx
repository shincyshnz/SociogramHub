import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader } from '../../components';
import { useResetPassword } from '../../lib/reactQuery/queriesAndMutations';
import { useAuth, useError } from '../../hooks/customHooks';
import OR from '../../components/OR';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  const { state } = useLocation();
  const { isAuthenticated } = useAuth();

  const {
    mutateAsync: ResetPassword,
    isPending: isLoading,
    isError,
  } = useResetPassword();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    deleteError('apiError');
    console.log(data, state.email);
    try {
      if (!state.email) return;
      const response = await ResetPassword({
        email: state.email,
        password: data.password
      });

      if (isError) {
        handleError('resetPassword', { message: "Resetting Password has failed. Please try again." });
      }
      if (response) {
        navigate("/sign-in");
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
      </div>
    </>
  )
}

export default ResetPassword