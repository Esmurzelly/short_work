import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutStart, signOutSuccess, signOutFailure } from '../store/user/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(currentUser)

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const res = await fetch('/api/auth/signout', {
        method: "POST"
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess());
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Profile data</h1>

      <div className='border rounded-md bg-slate-300'>
        <p>name: {currentUser.name}</p>
        <p>role: {currentUser.role}</p>
        <p>email: {currentUser.email}</p>
        {currentUser.avatar && <p>avatar: <img className='w-10 h-10' src={currentUser?.avatar} alt="" /></p>}

        {currentUser.jobs.length > 0 && (
          jobs.map(item => <p>{item.name}</p>)
        )}

        <button onClick={handleSignOut} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
         Sign Out
        </button>
      </div>
    </div>
  )
}
