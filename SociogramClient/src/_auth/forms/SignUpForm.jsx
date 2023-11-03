import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { SignUp, Dob } from "../../components"

const SignUpForm = () => {
  const [formValues, setFormValues] = useState({});
  const [isNext, setIsNext] = useState(false);
  const {
    field,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError } = useForm();

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
    dob: {

    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

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
    } else {
      clearErrors(name);
      setValue(name, value);
    }
  }

  return <>

    {!isNext ? <SignUp
      customRules={customRules}
      field={field}
      register={register}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      setFormValues={setFormValues}
      errors={errors}
      setIsNext={setIsNext}
    /> :
      <Dob
        customRules={customRules}
        field={field}
        register={register}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setFormValues={setFormValues}
        errors={errors}
      />}

    <div className="form-container w-full border p-6">
      <p className="text-sm">Have an account? <Link to="/sign-in">
        <span className="text-blue-600">Log in</span>
      </Link>
      </p>
    </div >

    <div className="form-container my-2">
      <p>Get the app.</p>
      <div className="flex justify-center items-center gap-3 mt-2">
        <img className="w-36" src="/assets/getItONgoogleplay.png" alt="google play" />
        <img className="w-36" src="/assets/getitonPlayStore.png" alt="app store" />
      </div>
    </div>
  </>
}

export default SignUpForm