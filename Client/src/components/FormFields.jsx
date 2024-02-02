import { Alert } from 'flowbite-react';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { CUSTOM_RULES } from '../constants';

const FormFields = ({ ...props }) => {
    const {
        label,
        name,
        type,
        register,
        errors,
        setValue,
        clearErrors,
        setError,
        watch = null,
        className = "input-form"
    } = props;
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    }

    const validateInput = (name, value) => {
        const rule = CUSTOM_RULES[name];
        if (!rule) return;

        const VALIDATION_RULES = [
            { type: "required", check: () => rule?.required && !value },
            { type: "pattern", check: () => rule?.pattern?.value && !rule.pattern.value.test(value) },
            { type: "minLength", check: () => value.length < rule?.minLength?.value },
            { type: "maxLength", check: () => value.length > rule?.maxLength?.value },
            { type: "validate", check: () => name === 'confirmPassword' && watch('password') !== value }
        ];

        for (const { type, check } of VALIDATION_RULES) {
            if (check()) {
                return setError(name, { type, message: rule?.[type]?.message });
            }
        }

        clearErrors(name);
        setValue(name, value);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        validateInput(name, value);
    };


    return <>
        <div className="input-container" >
            <input
                className={`${className} text-xs w-full rounded-md`}
                id={name}
                type={passwordShown ? "text" : type}
                placeholder={label}
                {...register(name, CUSTOM_RULES)}
                aria-invalid={errors[name] ? 'true' : 'false'}
                onChange={handleChange}
                onBlur={handleChange}
            />

            {type === "password" && (
                <i className="password-toggle" onClick={togglePasswordVisibility}>{passwordShown ? <AiFillEye /> : <AiFillEyeInvisible />}</i>
            )}
        </div >

        {errors[name] && (
            <Alert color="failure" className='alert'>
                {errors[name].message}
            </Alert>
        )}
    </>
}

export default FormFields