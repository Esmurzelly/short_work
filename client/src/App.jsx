import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CreateJob from './pages/CreateJob';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import PrivateProfile from './components/PrivateProfile';
import SideBar from './components/SideBar';
import CurrentJob from './pages/CurrentJob';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/Users';
import CurrentUser from './pages/CurrentUser';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          <Route element={<PrivateProfile />}>
            <Route path='/create-job' element={<CreateJob />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='job/:id' element={<CurrentJob />} />
          <Route path='/users' element={<Users />} />
          <Route path='/user/:id' element={<CurrentUser />} />
          </Route>

          <Route path='/sign-up' element={<Signup />} />
          <Route path='/sign-in' element={<Signin />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <SideBar />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
