import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure, loginUser } from '../store/user/authSlice'
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { currentUser, error, loading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  console.log('cur user', currentUser);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      dispatch(loginUser(formData))
      // dispatch(signInStart());
      // const response = await fetch(`/api/auth/signin`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // if(data.success === false) {
      //   dispatch(signInFailure(data.message));
      //   console.log(data.message);
      //   return;
      // }

      // dispatch(signInSuccess(data));
      // setFormData(data);
      navigate('/')
    } catch (error) {
      // dispatch(signInFailure());
      console.log(error);
    };
  };

  console.log('formData', formData);

  return (
    <div className='w-full bg-slate-600 h-screen'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div className='flex flex-row items-center gap-4'>
          <input onChange={handleChange} placeholder='email' id='email' type="email" />
          <label className='text-white' htmlFor="email">email</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input onChange={handleChange} placeholder='password' id='password' type="password" />
          <label className='text-white' htmlFor="password">password</label>
        </div>

        <OAuth />

        <button type='submit' disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex flex-row items-center gap-4'>
        <span>Dont have an account?</span>
        <Link to={'/sign-up'}>Register</Link>
      </div>
    </div>
  )
}
