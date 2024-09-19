import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, deleteUser } from '../store/user/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeUserData from '../components/ChangeUserData';

export default function Profile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUser());
      // dispatch(signOutStart());

      // const res = await fetch('/api/auth/signout', {
      //   method: "POST"
      // });
      // const data = await res.json();

      // if (data.success === false) {
      //   dispatch(signOutFailure(data.message));
      //   return;
      // }

      // dispatch(signOutSuccess());
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  };

  const changeOpenModal = () => {
    setModal(prev => !prev);
  };

  const handleDelele = () => {
    try {
      dispatch(deleteUser({id: currentUser._id}));
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col flex-1'>
      <h1>Profile data</h1>

      <div className='border rounded-md bg-slate-300'>
        <p>name: {currentUser.name}</p>
        <p>role: {currentUser.role}</p>
        <p>email: {currentUser.email}</p>
        {currentUser.avatar && <p>avatar: <img className='w-10 h-10' src={currentUser?.avatar} alt="" /></p>}

        {loading && currentUser && currentUser.jobs && currentUser.jobs.length > 0 && (
          jobs.map(item => <p>{item.name}</p>)
        )}

        <button onClick={changeOpenModal} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Change My Data
        </button>

        {modal && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative bg-white p-1 rounded-lg shadow-lg z-10'>
              <ChangeUserData setModal={setModal} />
            </div>
          </div>
        )}

        <button onClick={handleSignOut} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Sign Out
        </button>

        <button onClick={handleDelele} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Delete Account
        </button>
      </div>
    </div>
  )
}
