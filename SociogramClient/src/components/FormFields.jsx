import { Alert } from 'flowbite-react'
import React from 'react'

const FormFields = ({ label, name, register, errors, customRules, onChange, onBlur, field}) => {

    return <>
        <input
            className="input-form"
            id={name}
            placeholder={label}
            {...register(name, customRules)}
            aria-invalid={errors[name] ? 'true' : 'false'}
            onChange={onChange}
            onBlur={onBlur}
            {...field}
        />
        {errors[name] && (
            <Alert color="failure" className='alert'>
                {errors[name].message}
            </Alert>
        )}
    </>
}

export default FormFields