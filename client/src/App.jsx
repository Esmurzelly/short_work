import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import CreateJob from './pages/CreateJob';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';
// import Signin from './pages/Signin';
// import NotFound from './pages/NotFound';
import Header from './components/Header';
import PrivateProfile from './components/PrivateProfile';
import SideBar from './components/SideBar';
// import CurrentJob from './pages/CurrentJob';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Users from './pages/Users';
// import CurrentUser from './pages/CurrentUser';

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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='flex flex-col h-screen'>
          <Header />
          <Routes>
            <Route path='/' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            } />
            <Route path='/about' element={
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            } />

            <Route element={<PrivateProfile />}>
              <Route path='/create-job' element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateJob />
                </Suspense>
              } />
              <Route path='/profile' element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              } />
              <Route path='job/:id' element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CurrentJob />
                </Suspense>
              } />
              <Route path='/users' element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Users />
                </Suspense>
              } />
              <Route path='/user/:id' element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CurrentUser />
                </Suspense>
              } />
            </Route>

            <Route path='/sign-up' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Signup />
              </Suspense>
            } />
            <Route path='/sign-in' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Signin />
              </Suspense>
            } />

            <Route path='*' element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            } />
          </Routes>

          <SideBar />
          <ToastContainer />
        </div>


      </Suspense>
    </BrowserRouter>
  )
}

export default App
