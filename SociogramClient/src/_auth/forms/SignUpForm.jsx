import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { SignUp, Dob, GetApp } from "../../components"

const SignUpForm = () => {
  const [isNext, setIsNext] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError } = useForm();

  return <>
    <form className="px-4 mb-4 mx-auto" noValidate>

      {!isNext ? <SignUp
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        clearErrors={clearErrors}
        setError={setError}
        errors={errors}
        setIsNext={setIsNext}
      /> :
        <Dob
          handleSubmit={handleSubmit}
          errors={errors}
        />}

      <div className="form-container w-full border p-6">
        <p className="text-sm">Have an account? <Link to="/sign-in">
          <span className="text-blue-600">Log in</span>
        </Link>
        </p>
      </div >
      <GetApp />
    </form>
  </>
}

export default SignUpForm