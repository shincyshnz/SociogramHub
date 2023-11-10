import React, { useEffect } from 'react'
import { useAuth } from '../hooks/customHooks';
import { useNavigate } from 'react-router';

const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-up");
    }
  }, []);

  return (
    <div>RootLayout</div>
  )
}

export default RootLayout