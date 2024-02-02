import { useEffect } from 'react'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { useError } from './hooks/customHooks'
import { HiExclamation } from 'react-icons/hi'
import { NotificationToast } from './components'
import { SignUpForm, SignInForm, ResetPassword, ForgotPassword, Otp } from './_auth/forms'
import { EditPost, Explore, Home, Notifications, PostCards, Profile, Reels, Saved, Search, Settings } from './_root/pages'
import './index.css'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const { customError } = useError() || {};

  return (
    <main className='flex h-auto font-inter'>

      {(Object.keys(customError).length !== 0) &&
        Object.keys(customError).map((err, index) => (
          <NotificationToast
            key={index}
            Icon={customError[err].icon || <HiExclamation className='h-5 w-5' />}
            message={customError[err].message}
            type={customError[err].type || "error"}
          />
        ))
      }

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
