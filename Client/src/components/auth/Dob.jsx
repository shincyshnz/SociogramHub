import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import { Alert, Datepicker } from 'flowbite-react';
import { useError } from '../../hooks/customHooks';
import { Loader } from '..';
import { useCreateUserAccount } from '../../lib/reactQuery/queriesAndMutations';

const Dob = ({ handleSubmit, errors }) => {
    const navigate = useNavigate();
    const { handleError, deleteError } = useError();
    const today = formatDate(new Date());
    const [dob, setDob] = useState(today);

    // React-query : register new user
    const {
        mutateAsync: registerUser,
        isLoading
    } = useCreateUserAccount();

    const handleDob = (date) => {
        deleteError('dob');
        const formattedDate = formatDate(date);
        setDob((prev) => (prev = formattedDate));
    }

    const onSubmit = async (data, e) => {
        e.preventDefault();
        deleteError('apiError');
        try {
            if (Object.keys(errors).length > 0) return;

            if (dob === today || dob > today) {
                return handleError('dob', { message: 'Please Select a valid birth date' });
            }
            data.dob = dob;
            const response = await registerUser(data);
            if (response) {
                navigate("/sign-in");
            }
        } catch (error) {
            handleError('apiError', { message: error?.response?.data?.message || error?.message });
        }
    }

    return (
        <div className="form-container border w-full">
            <img className='w-40 filter drop-shadow-lg' src="/assets/cake.png" alt="date of birth" />
            <div className="flex-center gap-4 mb-4">
                <div className="w-[150px] border-b-[3px] border-gray-300"></div>
            </div>
            <h6 className="mb-4 font-bold">Add your Birthday</h6>
            <h6 className="mb-4">This won't be a part of your public profile.</h6>

            <Datepicker
                name="dob"
                autoHide={true}
                onSelectedDateChanged={handleDob}
            />

            {errors?.dob && (
                <Alert color="failure" className='alert'>
                    {errors?.dob.message}
                </Alert>
            )}

            <h6 className="mt-4 mb-4">You need to enter the date you were born.</h6>
            <p className="text-gray-500">Use your own birthday, even if this account is for a business, a pet, or something else.</p>

            <div className="w-full py-6">
                <button type="submit" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                    {isLoading ? (<Loader />) : <span>Next</span>}
                </button>
                <button onClick={() => navigate(-1)} className='text-blue-600 opacity-90 font-extrabold text-sm'>Go Back</button>
            </div>
        </div>
    )
}

export default Dob;
