import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, deleteUser, uploadAvatar, deleteAvatar } from '../store/user/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeUserData from '../components/ChangeUserData';
import { BsSun } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import { unfacedAvatar } from '../utils/expvars';
import ChangeLanguage from '../components/ChangeLanguage';
import { getJobById } from '../store/user/jobSlice';


export default function Profile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  });
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [clickedJobs, setClickedJobs] = useState([]);
  const avatarRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light');
    }
  }, [theme]);

  useEffect(() => {
    const fetchJobData = async (jobIds) => {
      try {
        const jobPromises = jobIds.map(id => dispatch(getJobById({ id })).unwrap());
        const jobsData = await Promise.all(jobPromises);
        setClickedJobs(jobsData);
      } catch (error) {
        console.error("Error loading jobs", error);
      }
    };

    if (currentUser?.clickedJobs?.length > 0) {
      fetchJobData(currentUser.clickedJobs);
    };

  }, [currentUser]);

  console.log('cur user', currentUser);
  console.log('users clickedJobs', clickedJobs);

  const handleAvatarClick = () => {
    avatarRef.current.click();
  }

  if (!currentUser || loading) {
    return <Loader />
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUser());
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
  };

  const handleSwitchTeme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='px-3 flex flex-col flex-1 text-black bg-beige-light dark:text-white dark:bg-black'>
      {/* <h1>{t('profile_data')}</h1> */}
      <div className='flex flex-col items-start p-2 gap-3'>
        <div className='flex flex-row items-end'>
          {imagePreview !== null ? (
            <div className='flex flex-row items-center gap-6'>
              <img onClick={handleAvatarClick} className='w-20 rounded-full cursor-pointer' src={
                currentUser?.avatar === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                  ? `${currentUser?.avatar}`
                  : currentUser?.avatar === null || undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                    : `http://localhost:3000/static/userAvatar/${currentUser?.avatar}`
              } alt="avatar" />
              <FaArrowRightArrowLeft className='w-5 h-5' />
              {imagePreview != null && <img className='w-20 rounded-full cursor-pointer' src={imagePreview} alt="imagePreview" />}

              <button className='ml-8' onClick={handleUploadAvatar}>
                <FaCloudUploadAlt className='w-6 h-6 cursor-pointer text-light-blue' />
              </button>

              <button className='ml-8' onClick={() => dispatch(deleteAvatar())}>
                <FaRegTrashAlt className='w-6 h-6 cursor-pointer text-light-blue' />
              </button>
            </div>
          ) : (
            <>
              <img onClick={handleAvatarClick} className='w-40 h-40 rounded-full object-cover cursor-pointer' src={
                currentUser?.avatar === unfacedAvatar ? `${currentUser?.avatar}`
                  : currentUser?.avatar === null || undefined ? unfacedAvatar
                    : !currentUser?.avatar ? unfacedAvatar
                      : `${import.meta.env.VITE_HOST}/static/userAvatar/${currentUser?.avatar}`
              } alt="avatar" />
              <button className='-ml-4' onClick={() => dispatch(deleteAvatar())}>
                <FaRegTrashAlt className='w-6 h-6 cursor-pointer text-light-blue' />
              </button>

              <h1 className='text-3xl ml-3 capitalize w-1/3 self-center'>{currentUser.name}</h1>
            </>
          )}
        </div>
        <input className='hidden' ref={avatarRef} onChange={handleFileChange} accept='image/*' type="file" name="" id="" />

      </div>

      <div className='mt-2 rounded-md dark:bg-slate-800 dark:border-none'>
        <p>{t('role')}: {currentUser.role}</p>
        <p>Email: {currentUser.email}</p>
        <p>Number: <a href={`tel:${currentUser.tel}`}>{currentUser.tel}</a></p>

        <div className='flex flex-row items-center gap-32 mt-4'>
          <button className='flex flex-row items-center gap-2 bg-red-light p-2 rounded-xl' onClick={handleSwitchTeme}>
            <span>{t('change_theme')}</span>
            {theme === 'dark' ? <BsSun className='w-3' /> : <FaRegMoon className='w-3' />}
          </button>

          <ChangeLanguage />
        </div>

        <div className='flex flex-col mt-3 break-all'>
          <p>{t('about')}:</p>
          {currentUser?.about ? <p className='bg-beige-medium rounded-md py-1 px-2'>{currentUser?.about}</p> : <p className='ml-1'>Nothing</p>}
        </div>

        {/* {loading && currentUser && currentUser.jobs && currentUser.jobs.length > 0 && (
          jobs.map(item => <p>{item.name}</p>)
        )} */}



        <div className='flex flex-row items-center gap-4 mt-5'>
          <button onClick={changeOpenModal} type='button' className='bg-red-light w-1/3 h-16 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {t('change_my_data')}
          </button>

          <button onClick={handleSignOut} type='button' className='bg-red-light w-1/3 h-16 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {t('Sign_out')}
          </button>

          <button onClick={handleDelele} type='button' className='bg-red-light w-1/3 h-16 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {t('Delete_account')}
          </button>
        </div>

        {clickedJobs && clickedJobs.length > 0 && <div className='mt-7'>
          <h3>Last clicked jobs</h3>
          {clickedJobs.slice(-3).reverse().map((item, index) =>
            <Link key={`${item.data._id}-${index}`} className='w-full bg-beige-light flex flex-row items-center gap-2' to={`/job/${item.data._id}`}>
              <div className=''>
                <img className='w-14' src={`${import.meta.env.VITE_HOST}/static/jobAvatar/${item.data.imageUrls[0]}`} alt="imageUrl" />
              </div>
              <div className=''>
                <p>{item.data.title}</p>
                <p>{item.data.salary}</p>
              </div>
            </Link>)}
        </div>}

        {modal && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div ref={modalRef} className='relative w-2/3 bg-beige-medium rounded-lg shadow-lg z-10'>
              <ChangeUserData setModal={setModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
