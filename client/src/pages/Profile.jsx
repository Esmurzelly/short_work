import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signOutUser, deleteUser, uploadAvatar, deleteAvatar, updateUser } from '../store/user/authSlice';
import { getJobById } from '../store/user/jobSlice';

import { BsSun } from "react-icons/bs";
import { FaRegMoon, FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

import { useTranslation } from 'react-i18next';

import { unfacedAvatar } from '../utils/expvars';

import ChangeLanguage from '../components/ChangeLanguage';
import LastRespondedData from '../components/LastRespondedData';
import ChangeUserData from '../components/ChangeUserData';
import Loader from '../components/Loader';


export default function Profile({ theme, setTheme }) {
  const { currentUser, loading } = useSelector(state => state.user, shallowEqual);
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [clickedJobs, setClickedJobs] = useState([]);
  const [yourOwnJobs, setYourOwnJobs] = useState([]);
  const [showMoreClickedJobs, setShowMoreClickedJobs] = useState(-3);
  const avatarRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleEvent = (event) => {
      if (modalRef.current &&
        (event.type === 'mousedown' && !modalRef.current.contains(event.target)) ||
        (event.type === 'keydown' && event.keyCode === 27)) {
        setModal(false);
      }
    };

    if (modal) {
      document.addEventListener('mousedown', handleEvent);
      document.addEventListener('keydown', handleEvent);
    }

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    };
  }, [modal]);

  useEffect(() => {
    const fetchJobClickedData = async (jobIds) => {
      try {
        const uniqueJobIds = Array.from(new Set(jobIds))
        const jobPromises = uniqueJobIds.map(async (id) => {
          try {
            return await dispatch(getJobById({ id })).unwrap()
          } catch (error) {
            console.log(error);
            return null;
          }
        });
        const jobsData = await Promise.all(jobPromises);
        setClickedJobs(jobsData.filter(job => job !== null));
      } catch (error) {
        console.error("Error loading jobs", error);
      }
    };

    const fetchJobCreatedData = async (jobIds) => {
      try {
        const jobPromises = jobIds.map(async (id) => {
          try {
            return await dispatch(getJobById({ id })).unwrap();
          } catch (error) {
            console.log(error);
            return null;
          }
        });
        const jobsData = await Promise.all(jobPromises);
        setYourOwnJobs(jobsData.filter(job => job !== null));
      } catch (error) {
        console.error("Error loading jobs", error);
      }
    };

    const handleJobDataFetch = async () => {
      if (currentUser?.clickedJobs?.length > 0) fetchJobClickedData(currentUser.clickedJobs);
      if (currentUser?.jobs?.length > 0) fetchJobCreatedData(currentUser.jobs);
      await dispatch(updateUser({
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.password,
        avatar: currentUser.avatar,
        role: currentUser.role,
        about: currentUser.about,
        tel: currentUser.tel,
      }))
    }

    handleJobDataFetch();
  }, []);

  const handleDelele = useCallback(() => {
    try {
      dispatch(deleteUser({ id: currentUser._id }));
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, navigate, currentUser]);

  const handleFileChange = useCallback((e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (selectedFile) reader.readAsDataURL(selectedFile);

    reader.onload = readerEvent => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    }
  }, []);

  const handleUploadAvatar = useCallback(() => {
    dispatch(uploadAvatar(selectedFile));
    setImagePreview(null);
    setSelectedFile(null);
  }, [dispatch, selectedFile, imagePreview]);

  const handleSwitchTeme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  const changeOpenModal = () => {
    setModal(prev => !prev);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUser());
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  };

  const handleAvatarClick = () => {
    avatarRef.current.click();
  };

  if (!currentUser || loading) return <Loader />

  return (
    <div className='px-3 flex flex-col flex-1 mt-14 text-black bg-white dark:text-white dark:bg-black'>
      <div className='flex flex-col items-start p-2 gap-3'>
        <div className='flex flex-row items-end'>
          {imagePreview !== null ? (
            <div className='flex flex-row items-center'>
              <img onClick={handleAvatarClick} className='w-20 rounded-full cursor-pointer' src={
                currentUser?.avatar === null ? unfacedAvatar
                  : (currentUser?.avatar.includes('https://lh3.googleusercontent.com') || currentUser?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${currentUser?.avatar}`
                    : `${import.meta.env.VITE_HOST}/static/userAvatar/${currentUser?.avatar}`
              } alt="avatar" />
              <FaArrowRightArrowLeft className='w-5 h-5 mx-2' />
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
              <img onClick={handleAvatarClick} className='w-40 h-40 rounded-full object-cover cursor-pointer'
                src={(currentUser?.avatar === null || currentUser?.avatar === undefined || !currentUser?.avatar) ? unfacedAvatar
                  : (currentUser?.avatar.includes('https://lh3.googleusercontent.com') || currentUser?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${currentUser?.avatar}`
                    : `${import.meta.env.VITE_HOST}/static/userAvatar/${currentUser?.avatar}`}

                alt="avatar" />
              <button className='-ml-4' onClick={() => dispatch(deleteAvatar())}>
                <FaRegTrashAlt className='w-6 h-6 cursor-pointer text-light-blue' />
              </button>

              <h1 className='text-3xl ml-3 capitalize w-1/3 self-center break-words'>{currentUser.name}</h1>
            </>
          )}
        </div>
        <input className='hidden' ref={avatarRef} onChange={handleFileChange} accept='image/*' type="file" name="" id="" />

      </div>

      <div className='mt-2 rounded-md dark:bg-slate-800 dark:border-none'>
        <p>{t('role')}: {currentUser.role}</p>
        <p>Email: {currentUser.email}</p>
        <p>{t('number')}: <a href={`tel:${currentUser.tel}`}>{currentUser.tel || `${t('doenst_exist')}`}</a></p>

        <div className='flex flex-row items-center gap-32 mt-4'>
          <button className='flex flex-row items-center gap-2 bg-red-light p-2 rounded-xl' onClick={handleSwitchTeme}>
            <span>{t('change_theme')}</span>
            {theme === 'dark' ? <BsSun className='w-3' /> : <FaRegMoon className='w-3' />}
          </button>

          <ChangeLanguage />
        </div>

        <div className='flex flex-col mt-3 break-all'>
          <p>{t('about')}:</p>
          {currentUser?.about ? <p className='bg-beige-medium rounded-md py-1 px-2'>{currentUser?.about}</p> : <p className='ml-1'>{t('nothing')}</p>}
        </div>

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

        {currentUser.role === 'employee' && clickedJobs && clickedJobs.length > 0 &&
          <div className='mt-7'>
            <h3>{t('last_clicked_jobs')}</h3>
            <LastRespondedData array={clickedJobs} showMoreClickedJobs={showMoreClickedJobs} setShowMoreClickedJobs={setShowMoreClickedJobs} />
          </div>
        }


        {currentUser.role === 'employer' && currentUser.jobs.length > 0 &&
          <div className='mt-7'>
            <h3>{t('your_created_jobs')}</h3>
            <LastRespondedData array={clickedJobs} showMoreClickedJobs={showMoreClickedJobs} setShowMoreClickedJobs={setShowMoreClickedJobs} />
          </div>
        }


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