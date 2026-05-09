import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';

const AuthGaurd =  lazy(() => import('../guard/AuthGuard'));
const GuestGuard =  lazy(() => import('../guard/GuestGuard'));
const SignInForm = lazy(() => import('../_auth/forms/SignInForm'));
const SignUpForm = lazy(() => import('../_auth/forms/SignUpForm'));
const ResetPassword = lazy(() => import('../_auth/forms/ResetPassword'));
const ForgotPassword = lazy(() => import('../_auth/forms/ForgotPassword'));
const Otp = lazy(() => import('../_auth/forms/Otp'));
const CreatePost = lazy(() => import('../_root/pages/CreatePost'));
const EditPost = lazy(() => import('../_root/pages/EditPost'));
const Explore = lazy(() => import('../_root/pages/Explore'));
const Home = lazy(() => import('../_root/pages/Home'));
const Notifications = lazy(() => import('../_root/pages/Notifications'));
const Profile = lazy(() => import('../_root/pages/Profile'));
const PostCards = lazy(() => import('../_root/pages/PostCards'));
const Reels = lazy(() => import('../_root/pages/Reels'));
const Saved = lazy(() => import('../_root/pages/Saved'));
const Search = lazy(() => import('../_root/pages/Search'));
const Settings = lazy(() => import('../_root/pages/Settings'));
const Messages = lazy(() => import('../_root/pages/Messages'));


const AppRoute = () => {
  const logoLoader = (
  <div className='flex-center w-full min-h-screen'>
    <img className='w-5 h-5' src="assets/logoIcon.png" alt="logo" />
  </div>
);

  return (
      <Routes>
        {/* Public Routes */}
        <Route element={
          <Suspense fallback={logoLoader}>
            <GuestGuard />
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
            <AuthGaurd />
          </Suspense>
        }>
          <Route index element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/reels' element={<Reels />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/create-posts' element={<CreatePost />} />
          <Route path='/update-posts/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostCards />} />
          <Route path='/profile/:id' element={
            <Suspense fallback={logoLoader}>
              <Profile />
            </Suspense>
          } />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile/:id/saved' element={<Saved />} />
        </Route>

      </Routes>
  )
}

export default AppRoute
