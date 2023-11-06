// import React, { useState } from 'react'
// import { Alert, Datepicker } from 'flowbite-react';
// import { useNavigate } from 'react-router-dom';
// import Loader from './Loader';

// const Dob = ({ handleSubmit, handleChange, register, errors, customRules }) => {
//     const [isLoading, setIsloading] = useState(false);
//     // const [dob, setDob] = useState(null);
//     const navigate = useNavigate();

//     // const handleDob = (date) => {
//     //     console.log(date);
//     //     // setError(delete errors.dob);
//     //     setDob(date);
//     // }

//     const onSubmit = (data, e) => {
//         e.preventDefault();
//         console.log(errors);

//         setIsloading(true);
//         data.dob = dob;
//         console.log(data);

//         // let formData = new FormData();
//         // for (const key in data) {
//         //   formData.append(key, data[key]);
//         // }
//         // const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/register`, formData, {
//         //   headers: {
//         //     'Content-Type': 'multipart/form-data',
//         //   },
//         // });
//     }

//     return (
//         <div className="form-container border w-full">
//             <img className='w-40 filter drop-shadow-lg' src="/assets/cake.png" alt="date of birth" />
//             <div className="flex justify-center items-center gap-4 mb-4">
//                 <div className="w-[150px] border-b-[3px] border-gray-300"></div>
//             </div>
//             <h6 className="mb-4 font-bold">Add your Birthday</h6>
//             <h6 className="mb-4">This won't be a part of your public profile.</h6>

//             <Datepicker
//                 name="dob"
//                 autoHide={true}
//                 onChange={handleChange}
//                 {...register('dob', customRules)}/>

//             {errors?.dob && (
//                 <Alert color="failure" className='alert'>
//                     {errors?.dob.message}
//                 </Alert>
//             )}

//             <h6 className="mt-4 mb-4">You need to enter the date you were born.</h6>
//             <p className="text-gray-500">Use your own birthday, even if this account is for a business, a pet, or something else.</p>

//             <div className="w-full py-6">
//                 <button type="submit" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
//                     {isLoading ? (<Loader />) : <span>Next</span>}
//                 </button>
//                 <button onClick={() => navigate(-1)} className='text-blue-600 opacity-90 font-extrabold text-sm'>Go Back</button>
//             </div>
//         </div>
//     )
// }

// export default Dob

import React, { useEffect, useRef, useState } from 'react';
import { Alert, Datepicker } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Dob = ({ handleSubmit, handleChange, register, errors, customRules }) => {
    const [isLoading, setIsloading] = useState(false);
    const [dob, setDob] = useState(null);
    const navigate = useNavigate();

    const handleDob = (date) => {
        const dateObject = new Date(date);

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();

        setDob(prev => prev = `${day}-${month}-${year}`);
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) return;

        setIsloading(true);
        data.dob = dob;
        console.log(data);
        // Rest of your form submission logic
    }

    return (
        <div className="form-container border w-full">
            <img className='w-40 filter drop-shadow-lg' src="/assets/cake.png" alt="date of birth" />
            <div className="flex justify-center items-center gap-4 mb-4">
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
