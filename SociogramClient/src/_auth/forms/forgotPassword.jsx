import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFields, Loader, GetApp } from '../../components';
import { useChangePassword } from '../../lib/reactQuery/queriesAndMutations';
import { useError } from '../../hooks/customHooks';

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
        setError,
    } = useForm();

    const { handleError, deleteError } = useError();
    const {
        mutateAsync: ChangePassword,
        isLoading
    } = useChangePassword();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        deleteError('apiError');
        try {
            if (Object.keys(errors).length > 0) return;

            const response = await ChangePassword(data);

            if (!response) {
                handleError('changePassword', { message: "Changing password failed. Please try again." });
            }

            console.log(response);
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
                            {isLoading ? (<Loader />) : <span>Submit</span>}
                        </button>
                    </div>
                </form>
            </div >
        </>
    )
}

export default ForgotPassword