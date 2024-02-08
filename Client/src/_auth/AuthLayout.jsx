import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/customHooks';
import { Footer } from '../components'

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (<Navigate to="/" />) : (
        <>
          <section className='flex flex-col justify-start items-center mx-auto mt-3' >
            <Outlet />
            <Footer />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout