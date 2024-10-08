import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/user/authSlice'
import OAuth from '../components/OAuth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [formData, setFormData] = useState({});
  const { currentUser, error, loading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (errors.email?.type === 'required' || errors.password?.type === 'required') toast.error("All of fields are required")
  }, [errors]);

  if (loading) {
    return <Loader />
  }

  if (error) return <p>Error...</p>

  console.log('cur user', currentUser);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmitForm = async (data) => {
    console.log('formData from client', data);

    try {
      dispatch(loginUser(data));
    } catch (error) {
      console.log(error);
    };
  };

  console.log('formData', formData);

  return (
    <div className='w-full h-screen text-black bg-white dark:text-white dark:bg-black'>
      <h1>{t("sign_in")}</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-3'>
        <div className='flex flex-row items-center gap-4 text-black'>
          <input className='dark:bg-slate-800 dark:text-white' {...register("email", { required: true })} placeholder='email' id='email' type="email" />
          <label className='text-black dark:text-white' htmlFor="email">email</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input className='dark:bg-slate-800 dark:text-white' {...register("password", { required: true })} placeholder='password' id='password' type="password" />
          <label className='text-black dark:text-white' htmlFor="password">{t("password")}</label>
        </div>

        <OAuth />

        <button type='submit' disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? `${t("loading")} ` : `${t("sign_in")}`}
        </button>
      </form>
      <div className='flex flex-row items-center gap-4'>
        <span>{t("Dont_have_an_account")}</span>
        <Link to={'/sign-up'}>{t("Register")}</Link>
      </div>
    </div>
  )
}
