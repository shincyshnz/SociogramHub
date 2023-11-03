import React, { useState } from 'react'
import { FormFields } from './index'


const Dob = ({
    customRules,
    field,
    register,
    handleSubmit,
    handleChange,
    setFormValues,
    errors,
}) => {
    const [isLoading, setIsloading] = useState(false);

    const onSubmit = (data, e) => {
        e.preventDefault();
        setIsloading(true);
        // setFormValues(prev => prev = data);
        console.log(data);
        // let formData = new FormData();
        // for (const key in data) {
        //   formData.append(key, data[key]);
        // }
        // const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/register`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
    }

    return (
        <div className="form-container border w-full">
            <img className='w-40 filter drop-shadow-lg' src="/assets/cake.png" alt="date of birth" />
            <form className="px-4 mb-4 w-full" noValidate>
                <h6 className="text-gray-500 mb-4 font-light text-sm">Tell me about your birthday</h6>

                <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="w-[150px] border-b-[3px] border-gray-300"></div>
                </div>

                <div className="flex gap-2">
                    <FormFields label={"Day"} name={"email"} type={"text"} register={register} errors={errors} customRules={customRules.email} onChange={handleChange}
                        onBlur={handleChange} field={field} />
                    <FormFields label={"Month"} name={"email"} type={"text"} register={register} errors={errors} customRules={customRules.email} onChange={handleChange}
                        onBlur={handleChange} field={field} />
                    <FormFields label={"Year"} name={"email"} type={"text"} register={register} errors={errors} customRules={customRules.email} onChange={handleChange}
                        onBlur={handleChange} field={field} />
                </div>

                <div className="w-full py-6">
                    <button type="submit" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                        {isLoading ? (<Loader />) : <span>Sign Up</span>}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Dob