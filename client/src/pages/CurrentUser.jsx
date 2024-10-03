import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'
import { getUserById } from '../store/user/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

export default function CurrentUser() {
  const { neededUser, loading } = useSelector(state => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log('neededUser', neededUser);

  useEffect(() => {
    dispatch(getUserById({ id }));

  }, [id]);

  if (!neededUser || loading) {
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

  return (
    <div className='flex flex-col flex-1 text-black bg-white dark:text-white dark:bg-black'>
      <p>{t('name')}: {neededUser.name}</p>
      <p>{t('role')}: {neededUser.role}</p>
      <p>email: {neededUser.email}</p>

      <img className='w-40 cursor-pointer' src={
        neededUser?.avatar === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
          : (neededUser?.avatar.includes('https://lh3.googleusercontent.com') || neededUser?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${neededUser?.avatar}`
            : `http://localhost:3000/static/userAvatar/${neededUser?.avatar}`
      } alt="avatar" />

      <button onClick={() => navigate(-1)} className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Back')}</button>
    </div>
  )
}