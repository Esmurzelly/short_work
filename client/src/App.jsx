import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import PrivateProfile from './components/PrivateProfile';
import SideBar from './components/SideBar';
import Loader from './components/Loader';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About'));
const CreateJob = lazy(() => import(/* webpackChunkName: "CreateJob" */ './pages/CreateJob'));
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile'));
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ './pages/Signup'));
const Signin = lazy(() => import(/* webpackChunkName: "Signin" */ './pages/Signin'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const CurrentJob = lazy(() => import(/* webpackChunkName: "CurrentJob" */ './pages/CurrentJob'));
const Users = lazy(() => import(/* webpackChunkName: "Users" */ './pages/Users'));
const CurrentUser = lazy(() => import(/* webpackChunkName: "CurrentUser" */ './pages/CurrentUser'));
const Introduction = lazy(() => import(/* webpackChunkName: "Introduction" */ './pages/Introduction'));

function App() {
  const isAuth = useSelector(state => Boolean(state.user.currentUser));
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <div className={`flex flex-col min-h-screen`}>
          <Header isAuth={isAuth} />
          <Routes>
            {isAuth ? <Route path='/' element={<Home />} /> : <Route path='/' element={<Introduction />} />}
            <Route path='/about' element={<About />} />

            <Route element={<PrivateProfile />}>
              <Route path='/create-job' element={<CreateJob />} />
              <Route path='/profile' element={<Profile theme={theme} setTheme={setTheme} />} />
              <Route path='job/:id' element={<CurrentJob />} />
              <Route path='/users' element={<Users />} />
              <Route path='/user/:id' element={<CurrentUser />} />
            </Route>

            <Route path='/sign-up' element={<Signup />} />
            <Route path='/sign-in' element={<Signin />} />

            <Route path='*' element={<NotFound />} />
          </Routes>

          <SideBar isAuth={isAuth} />
          <ToastContainer />
        </div>
      </Suspense>

    </BrowserRouter>
  )
}

export default App
