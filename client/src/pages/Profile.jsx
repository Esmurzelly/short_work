import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, deleteUser, uploadAvatar, deleteAvatar } from '../store/user/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeUserData from '../components/ChangeUserData';
import { Triangle } from 'react-loader-spinner';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";

export default function Profile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const avatarRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEvent = (event) => {
      if (modalRef.current && (event.type === 'mousedown' && !modalRef.current.contains(event.target)) || event.type === 'keydown' && event.keyCode === 27) setModal(false);
    };

    if (modal) {
      document.addEventListener('mousedown', handleEvent);
      document.addEventListener('keydown', handleEvent);
    } else {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    }

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    };
  }, [modal]);

  console.log('cur user', currentUser);

  const handleAvatarClick = () => {
    avatarRef.current.click();
  }

  if (!currentUser || loading) {
    return <div className='w-full min-h-screen flex items-center justify-center'>
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
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
      dispatch(deleteUser({ id: currentUser._id }));
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (selectedFile) reader.readAsDataURL(selectedFile);

    reader.onload = readerEvent => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    }
  };


  const handleUploadAvatar = () => {
    dispatch(uploadAvatar(selectedFile));
    setImagePreview(null);
    setSelectedFile(null);
  }

  return (
    <div className='flex flex-col flex-1 text-black bg-white dark:text-white dark:bg-black'>
      <h1>Profile data</h1>

      <div className='border rounded-md dark:bg-slate-800 dark:border-none p-1'>
        <p>name: {currentUser.name}</p>
        <p>role: {currentUser.role}</p>
        <p>email: {currentUser.email}</p>
        <p className='break-all'>about: {currentUser?.about}</p>

        <div className='flex flex-col items-start p-2 gap-3'>
          <div className='flex flex-row items-end'>
            {imagePreview !== null ? (
              <div className='flex flex-row items-center gap-6'>
                <img onClick={handleAvatarClick} className='w-20 cursor-pointer' src={
                  currentUser?.avatar === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                    ? `${currentUser?.avatar}`
                    : currentUser?.avatar === null || undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                      : `http://localhost:3000/static/userAvatar/${currentUser?.avatar}`
                } alt="" />
                <FaArrowRightArrowLeft className='w-5 h-5' />
                {imagePreview != null && <img className='w-20 cursor-pointer rounded-md' src={imagePreview} alt="imagePreview" />}

                <button className='ml-8' onClick={handleUploadAvatar}>
                  <FaCloudUploadAlt className='w-6 h-6 cursor-pointer text-light-blue' />
                </button>

                <button className='ml-8' onClick={() => dispatch(deleteAvatar())}>
                  <FaRegTrashAlt className='w-6 h-6 cursor-pointer text-light-blue' />
                </button>
              </div>
            ) : (
              <>
                <img onClick={handleAvatarClick} className='w-40 cursor-pointer' src={
                  currentUser?.avatar === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s' ? `${currentUser?.avatar}`
                    : currentUser?.avatar === null || undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                      : !currentUser?.avatar ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                        : `http://localhost:3000/static/userAvatar/${currentUser?.avatar}`
                } alt="avatar" />
                <button className='ml-8' onClick={() => dispatch(deleteAvatar())}>
                  <FaRegTrashAlt className='w-6 h-6 cursor-pointer text-light-blue' />
                </button>
              </>
            )}
          </div>
          <input className='hidden' ref={avatarRef} onChange={handleFileChange} accept='image/*' type="file" name="" id="" />
        </div>

        {loading && currentUser && currentUser.jobs && currentUser.jobs.length > 0 && (
          jobs.map(item => <p>{item.name}</p>)
        )}

        <div className='flex flex-row items-center gap-4 mt-5'>
          <button onClick={changeOpenModal} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Change My Data
          </button>

          <button onClick={handleSignOut} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Sign Out
          </button>

          <button onClick={handleDelele} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Delete Account
          </button>
        </div>

        {modal && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div ref={modalRef} className='relative bg-white p-1 rounded-lg shadow-lg z-10'>
              <ChangeUserData setModal={setModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
