import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInForm from './_auth/forms/SignInForm'
import RootLayout from './_root/RootLayout'
import './index.css'


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
        </Route>
      </Routes>
    </main>
  )
}

export default App
