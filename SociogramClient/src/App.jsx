import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import './index.css'
import { useError } from './hooks/customHooks'
import { HiExclamation } from 'react-icons/hi'
import { NotificationToast } from './components'
import { SignUpForm, SignInForm, ResetPassword, ForgotPassword, Otp } from './_auth/forms'


const App = () => {
  const { customError } = useError();

  return (
    <main className='flex h-screen font-inter'>
      {Object.keys(customError).length !== 0 && (
        <div className="absolute float-right top-5 right-5 max-w-[300px]">
          {Object.keys(customError).map((err, index) => (
            <NotificationToast
              key={index}
              Icon={customError[err].icon || <HiExclamation className='h-5 w-5' />}
              message={customError[err].message}
              type={customError[err].type || "error"}
            />
          ))}
        </div>
      )}
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<RootLayout />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
