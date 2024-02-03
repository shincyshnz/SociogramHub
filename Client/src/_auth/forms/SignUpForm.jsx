import { useState } from "react";
import { useForm } from "react-hook-form"
import { SignUp, Dob, GetApp, GetAuthLinks } from "../../components"

const SignUpForm = () => {
  const [isNext, setIsNext] = useState(false);

  // React-hook-form
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

      <GetAuthLinks
        link={{
          'text': 'Have an account?',
          'link': '/sign-in'
        }}
        text={'Log in'}
      />
      <GetApp />
    </form>
  </>
}

export default SignUpForm