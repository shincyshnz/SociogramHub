import { Route, Routes } from 'react-router-dom'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'

import { Home } from './_root/pages'
import './globals.css'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Sign from './_auth/forms/Sign'

const App = () => {
  return (
    <main className='flex h-screen font-inter'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
          <Route path='/sign' element={<Sign />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
