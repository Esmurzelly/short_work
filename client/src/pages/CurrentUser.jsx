import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../store/user/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import { unfacedAvatar } from '../utils/expvars';

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

  if ( loading) return <Loader />
  if (!neededUser || error) return <p>asd</p>

  return (
    <div className='flex flex-col flex-1 mt-14 text-black bg-white dark:text-white dark:bg-black'>
      <p>{t('name')}: {neededUser.name}</p>
      <p>{t('role')}: {neededUser.role}</p>
      <p>email: {neededUser.email}</p>
      <p>Number: <a href={`tel:${neededUser?.tel}`}>{neededUser?.tel}</a></p>

      <img className='w-40 cursor-pointer' src={
        neededUser?.avatar === null ? unfacedAvatar
          : (neededUser?.avatar.includes('https://lh3.googleusercontent.com') || neededUser?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${neededUser?.avatar}`
            : `${import.meta.env.VITE_HOST}/static/userAvatar/${neededUser?.avatar}`
      } alt="avatar" />

      <button onClick={() => navigate(-1)} className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Back')}</button>
    </div>
  )
}