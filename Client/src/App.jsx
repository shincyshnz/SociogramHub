import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import { HiExclamation } from 'react-icons/hi'
import './index.css'
// import AuthLayout from './_auth/AuthLayout'
// import RootLayout from './_root/RootLayout'
import { NotificationToast } from './components'
import { useError } from './hooks/customHooks'
import { SignUpForm, SignInForm, ResetPassword, ForgotPassword, Otp } from './_auth/forms'
import { EditPost, Explore, Home, Notifications, PostCards, Profile, Reels, Saved, Search, Settings } from './_root/pages'

const RootLayout = lazy(() => import('./_root/RootLayout'));
const AuthLayout = lazy(() => import('./_auth/AuthLayout'));

const logoLoader = (
  <div className='flex-center w-full min-h-screen'>
    <img className='w-5 h-5' src="assets/logoIcon.png" alt="logo" />
  </div>
);

const App = () => {
  const { customError } = useError() || {};
  const errorKeysArray = Object.keys(customError);

  return (
    <main className='flex h-auto font-inter'>

      {errorKeysArray.length !== 0 &&
        errorKeysArray.map((err, index) => (
          <NotificationToast
            key={index}
            Icon={customError[err].icon || <HiExclamation className='h-5 w-5' />}
            message={customError[err].message}
            type={customError[err].type || "error"}
          />
        ))
      }

      {/* Public Routes */}
      <Routes>
        <Route element={
          <Suspense fallback={logoLoader}>
            <AuthLayout />
          </Suspense>
        }>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={
          <Suspense fallback={logoLoader}>
            <RootLayout />
          </Suspense>
        }>
          <Route index element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/reels' element={<Reels />} />
          <Route path='/messages' element={<Home />} />
          <Route path='/notifications' element={<Notifications />} />
          {/* <Route path='/create-posts' element={<CreatePost />} /> */}
          <Route path='/update-posts/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostCards />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile/:id/saved' element={<Saved />} />
        </Route>

      </Routes>
    </main>
  )
}

export default App
