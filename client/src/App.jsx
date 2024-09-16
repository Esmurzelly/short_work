import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CreateJob from './pages/CreateJob';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import NotFound from './pages/NotFound';


function App() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/get');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);

      } catch (error) {
        console.log('Fetch error:', error);
        setError(error.message);

      }
    }

    fetchData();
  }, []);

  console.log('fetched data', data);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='create-job' element={<CreateJob />} />
        <Route path='profile' element={<Profile />} />
        <Route path='sign-in' element={<Signin />} />
        <Route path='sign-out' element={<Signout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
