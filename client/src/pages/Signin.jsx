import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/user/authSlice'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import Loader from '../components/Loader';
import OAuth from '../components/OAuth';

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

  const handleSubmitForm = async (data) => {
    try {
      dispatch(loginUser(data));
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className='flex flex-col lg:justify-center text-center w-full min-h-screen bg-white px-2 mt-3 lg:mt-0 text-black dark:text-white dark:bg-black'>
      <h1 className='text-4xl'>{t("sign_in")}</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='lg:w-1/2 lg:mx-auto flex flex-col gap-3 mt-4'>
        <div className='flex flex-row lg:w-full items-center gap-4'>
          <input className='lg:w-full flex dark:bg-slate-800 dark:text-white focus:outline-none border p-1' {...register("email", { required: true })} placeholder='email' id='email' type="email" />
          <label className='dark:text-white' htmlFor="email">Email</label>
        </div>
        <div className='flex flex-row lg:w-full items-center gap-4'>
          <input className='lg:w-full flex dark:bg-slate-800 dark:text-white focus:outline-none border p-1' {...register("password", { required: true })} placeholder='password' id='password' type="password" />
          <label className='dark:text-white' htmlFor="password">{t("password")}</label>
        </div>

        <OAuth />

        <button type='submit' disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? `${t("loading")} ` : `${t("sign_in")}`}
        </button>
      </form>
      <div className='flex flex-row items-center gap-4 mt-3 lg:w-1/2 lg:mx-auto'>
        <span>{t("Dont_have_an_account")}</span>
        <Link className='hover:text-red-600 duration-300' to={'/sign-up'}>{t("Register")}</Link>
      </div>
    </div>
  )
}
