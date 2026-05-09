import clsx from 'clsx';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { HiExclamation } from 'react-icons/hi'
import './index.css'
import { NotificationToast } from './components'
import { useAuth, useError, useTheme } from './hooks/customHooks'
import AppRoute from './routes/AppRoute';


const App = () => {
  const { themeName } = useTheme();
  const { getToken } = useAuth();
  const accessToken = getToken("accessToken");
  const navigate = useNavigate();

  const { customError, deleteError } = useError() || {};
  const errorKeysArray = Object.keys(customError);

  useEffect(() => {
    deleteError("apiError");
    (!accessToken) ? navigate("/sign-in") : navigate("/");
  }, [accessToken]);

  
  return (
    <main className={clsx('flex h-auto font-inter min-h-lvh overflow-y-auto', themeName === "dark" ? "dark-theme dark" : "light-theme light")}>

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

      <AppRoute />
    </main>
  )
}

export default App
