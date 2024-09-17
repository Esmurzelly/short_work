import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/user/authSlice';

export default function Signup() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(registerUser(formData))
      // setLoading(true);
      // const response = await fetch('/api/auth/signup', {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData)
      // });

      // const data = await response.json();

      // if (data.success === false) {
      //   setLoading(false);
      //   console.log(data.message)
      // };

      // setLoading(false);
      // setFormData(data);
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  };

  const handleSelect = (selectedOption) => {
    setFormData({
      ...formData,
      "role": selectedOption.value
    })
  };

  const options = [
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' },
  ];

  console.log(formData);

  return (
    <div className='w-full bg-slate-600 h-screen'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row items-center gap-4'>
          <input onChange={handleChange} id='name' type="text" />
          <label className='text-white' htmlFor="name">name</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input onChange={handleChange} id='email' type="email" />
          <label className='text-white' htmlFor="email">email</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input onChange={handleChange} id='password' type="password" />
          <label className='text-white' htmlFor="password">password</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input onChange={handleChange} id='age' type="number" />
          <label className='text-white' htmlFor="age">age</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Select onChange={(e) => handleSelect(e)} options={options} />
          {/* <select onChange={handleChange} name="role" id="role">
            <option disabled value=""></option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select> */}
          <label className='text-white' htmlFor="role">role</label>
        </div>

        {/* avatar */}
        {/* <div className='flex flex-row items-center gap-4'>
          <input id='name' type="text" />
          <label className='text-white' htmlFor="name">name</label>
        </div> */}

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
