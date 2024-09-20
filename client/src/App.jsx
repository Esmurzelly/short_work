import { useEffect, useState } from 'react';
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentJob from './pages/CurrentJob';

function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('api/get');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const result = await response.json();
  //       setData(result);

  //     } catch (error) {
  //       console.log('Fetch error:', error);

  //     }
  //   }

  //   fetchData();
  // }, []);

  // console.log('fetched data', data);

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='job/:id' element={<CurrentJob />} />
          <Route path='/about' element={<About />} />

          <Route element={<PrivateProfile />}>
            <Route path='/create-job' element={<CreateJob />} />
            <Route path='/profile' element={<Profile />} />
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
