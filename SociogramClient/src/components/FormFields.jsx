import { Alert } from 'flowbite-react'
import React from 'react'

const FormFields = ({ label, name, register, errors, customRules }) => {

    return <>
        <input
            className="input-form" placeholder={label}
            {...register(name, customRules)}
            aria-invalid={errors[name] ? 'true' : 'false'}
        />
        {errors[name] && (
            <Alert color="failure" className='alert'>
                {errors[name].message}
            </Alert>
        )}
    </>
}

export default FormFields