import { useForm } from "react-hook-form"
import FormFields from "../../components/FormFields";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {
  const {
    field,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError } = useForm();
  const [formValues, setFormValues] = useState({});
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
     
    if(!rule) return;

    if (rule?.required && !value) {
      setError(name, { type: "required", message: rule.required }
      );
    } else if (rule?.pattern && !rule?.pattern?.value.test(value)) {
      setError(name, { type: "pattern", message: rule?.pattern?.message });
    } else if (value.length < rule?.minLength?.value) {
      setError(name, { type: "minLength", message: rule?.minLength?.message });
    }else if (value.length > rule?.maxLength?.value) {
      setError(name, { type: "maxLength", message: rule?.maxLength?.message });
    } else {
      clearErrors(name);
      setValue(name, value);
    }
  }

  const onSubmit = (data) => {
    console.log(data);

    // Write logic for submit
  }


  return <>
    <div className="form-container border">
      <img className="max-w-[85%] px-10 mx-auto" src="/assets/logo.png" alt="logo" />

      <form className="px-4 mb-4 w-full" noValidate>
        <h6 className="text-gray-500 mb-4 font-bold text-base">Sign up to see photos and videos from your friends.</h6>
        <a href="#" className="flex justify-center items-center gap-2 w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700">
          <img className="bg-white w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
          <span>Log in With Facebook</span>
        </a>
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="w-[150px] border-b-[1px] border-gray-300"></div>
          <h6 className="font-semibold text-gray-500 text-sm">OR</h6>
          <div className="w-[150px] border-b-[1px] border-gray-300"></div>
        </div>

        <div className="flex flex-col gap-2">
          <FormFields label={"Email"} name={"email"} type={"text"} register={register} errors={errors} customRules={customRules.email} onChange={handleChange}
            onBlur={handleChange} field={field} />
          <FormFields label={"Full Name"} name={"fullname"} type={"text"} register={register} errors={errors} customRules={customRules.fullname} onChange={handleChange}
            onBlur={handleChange} field={field} />
          <FormFields label={"Username"} name={"username"} type={"text"} register={register} errors={errors} customRules={customRules.username} onChange={handleChange}
            onBlur={handleChange} field={field} />
          <FormFields label={"Password"} name={"password"} type={"password"} register={register} errors={errors} customRules={customRules.password} onChange={handleChange}
            onBlur={handleChange} field={field} />
        </div>
      </form>

      <div className="px-3 py-2 text-gray-500">
        <p className="mb-3">People who use our service may have uploaded your contact information to sociogramhub. <span className="text-blue-900">Learn More</span></p>
        <p>By signing up, you agree to our <span className="text-blue-900">Terms , Privacy Policy <span className="text-gray-500">and</span> Cookies Policy .</span></p>
      </div>

      <div className="w-full px-6 py-2">
        <button type="submit" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
          <span>Sign Up</span>
        </button>
      </div>
    </div>

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