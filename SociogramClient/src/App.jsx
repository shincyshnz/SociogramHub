import { Route, Routes } from 'react-router-dom'
import { Home } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import './index.css'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInForm from './_auth/forms/SignInForm'
import RootLayout from './_root/RootLayout'

const App = () => {
  return (
    <main className='flex h-screen font-inter'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
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
