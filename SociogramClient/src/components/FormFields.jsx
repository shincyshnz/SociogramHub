import { Alert } from 'flowbite-react'
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const FormFields = ({ label, name, type, register, errors, customRules, onChange, onBlur, field }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => (passwordShown = !passwordShown));
    }

    return <>
        <div className="input-container">
            <input
                className="input-form"
                id={name}
                type={passwordShown ? "text" : type}
                placeholder={label}
                {...register(name, customRules)}
                aria-invalid={errors[name] ? 'true' : 'false'}
                onChange={onChange}
                onBlur={onBlur}
                {...field}
            />

            {type === "password" && (
                <i className="password-toggle" onClick={togglePasswordVisibility}>{passwordShown ? <AiFillEye /> : <AiFillEyeInvisible />}</i>
            )}
        </div>

        {errors[name] && (
            <Alert color="failure" className='alert'>
                {errors[name].message}
            </Alert>
        )}
    </>
}

export default FormFields