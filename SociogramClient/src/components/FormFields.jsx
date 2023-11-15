import { Alert } from 'flowbite-react'
import { useState } from 'react'
import { useWatch } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const FormFields = ({
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
}) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const customRules = {
        email: {
            required: "Email is required",
            pattern: {
                value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                message: 'Invalid email format.',
            },
        },
        fullname: {
            required: "Full Name is required",
            maxLength: {
                value: 20,
                message: 'Full Name must be of maximum 20 characters.',
            }
        },
        username: {
            required: "Username is required",
            maxLength: {
                value: 20,
                message: 'Username must be of maximum 20 characters.',
            }
        },
        password: {
            required: "password is required",
            minLength: {
                value: 6,
                message: "Password must be of minimum 6 character."
            }
        },
        confirmPassword: {
            required: "Confirm password required",
        },
        dob: {
            required: "Date of birth is required",
        },
        otp: {
            pattern: {
                value: /^[0-9]*$/,
            }
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => (passwordShown = !passwordShown));
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        const rule = customRules[name];

        if (!rule) return;

        if (rule?.required && !value) {
            setError(name, { type: "required", message: rule.required }
            );
        } else if (rule?.pattern && !rule?.pattern?.value.test(value)) {
            setError(name, { type: "pattern", message: rule?.pattern?.message });
        } else if (value.length < rule?.minLength?.value) {
            setError(name, { type: "minLength", message: rule?.minLength?.message });
        } else if (value.length > rule?.maxLength?.value) {
            setError(name, { type: "maxLength", message: rule?.maxLength?.message });
        } else if (name === 'confirmPassword' && watch('password') !== value) {
            setError(name, { type: "validate", message: "password do not match" });
        } else {
            clearErrors(name);
            setValue(name, value);
        }
    }

    return <>
        < div className="input-container" >
            <input
                className={className}
                id={name}
                type={passwordShown ? "text" : type}
                placeholder={label}
                {...register(name, customRules)}
                aria-invalid={errors[name] ? 'true' : 'false'}
                onChange={handleChange}
                onBlur={handleChange}
            />

            {
                type === "password" && (
                    <i className="password-toggle" onClick={togglePasswordVisibility}>{passwordShown ? <AiFillEye /> : <AiFillEyeInvisible />}</i>
                )
            }
        </div >

        {
            errors[name] && (
                <Alert color="failure" className='alert'>
                    {errors[name].message}
                </Alert>
            )
        }
    </>
}

export default FormFields