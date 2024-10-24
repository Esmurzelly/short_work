import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUserById } from '../store/user/authSlice';

import { useTranslation } from 'react-i18next';

import { unfacedAvatar } from '../utils/expvars';

import Loader from '../components/Loader';
import Error from '../components/Error';

export default function CurrentUser() {
  const { neededUser, loading, error } = useSelector(state => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log('neededUser', neededUser);

  useEffect(() => {
    dispatch(getUserById({ id }));

  }, [id]);

  if (loading) return <Loader />
  if (!neededUser || error) return <Error />

  return (
    <div className='flex flex-1 flex-col justify-between text-2xl mt-14 text-black bg-white dark:text-white dark:bg-black'>
      <div className='flex flex-col'>
        <img className='w-1/3 object-cover' src={
          neededUser?.avatar === null ? unfacedAvatar
            : (neededUser?.avatar.includes('https://lh3.googleusercontent.com') || neededUser?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${neededUser?.avatar}`
              : `${import.meta.env.VITE_HOST}/static/userAvatar/${neededUser?.avatar}`
        } alt="avatar" />

        <div className='flex flex-col mt-5 gap-1'>
          <p className='capitalize'>{neededUser.name}</p>
          <p>{t('role')}: {neededUser.role}</p>
          <p>Email: {neededUser.email}</p>
          <p>About: {neededUser?.about ? neededUser.about : "No info"}</p>
          <p>Number: <a href={`tel:${neededUser?.tel}`}>{neededUser?.tel ? neededUser?.tel : "No info"}</a></p>
        </div>
      </div>


      <div className='flex flex-col gap-2 my-3'>
        {neededUser?.tel && <a className='bg-green-700 text-center text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' href={`tel:${neededUser?.tel}`}>Call</a>}
        <button onClick={() => navigate(-1)} className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Back')}</button>
      </div>
    </div>
  )
}