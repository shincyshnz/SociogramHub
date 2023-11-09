import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/customHooks';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const AuthLayout = () => {
  const { isAuthenticated, setIsAuthenticated, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getToken("accessToken");

    if (accessToken) {
      navigate("/home");
    }

  }, []);

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