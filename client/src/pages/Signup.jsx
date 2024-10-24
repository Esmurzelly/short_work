import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/user/authSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { options } from '../utils/expvars';

import { useTranslation } from 'react-i18next';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  

  useEffect(() => {
    if (errors.name?.type === 'required' || errors.email?.type === 'required' || errors.password?.type === 'required' || errors.age?.type === 'required') toast.error("Name, Email, Password and Age fields are required");
    if (errors.email?.type === 'minLength' || errors.password?.type === 'minLength') toast.error("Min length of each field is 5");
    if (errors.name?.type === 'minLength') toast.error("Min length of name field is 3");
    if (errors.name?.type === 'minLength' || errors.email?.type === 'maxLength' || errors.password?.type === 'maxLength') toast.error("Max length of each field is 99");
    if (errors.age?.type === 'pattern') toast.error("Age field includes only nubmers");
  }, [errors]);

  const handleSubmitForm = async (data) => {
    try {
      dispatch(registerUser({
        ...data,
        "role": selectedOption
      }));

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const handleSelect = (selectedOptionItem) => {
    setSelectedOption(selectedOptionItem.value)
  };

  return (
    <div className='w-full h-screen text-black bg-white dark:text-white dark:bg-black'>
      <h1>{t('sign_up')}</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col items-start gap-3'>
        <div className='flex flex-row items-center gap-4'>
          <input className='dark:text-black dark:bg-slate-500 border' {...register("name", { required: true, minLength: 3, maxLength: 99 })} id='name' type="text" />
          <label className='text-black dark:text-white' htmlFor="name">{t('name')}</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input className='dark:text-black dark:bg-slate-500 border' {...register("email", { required: true, minLength: 5, maxLength: 99 })} id='email' type="email" />
          <label className='text-black dark:text-white' htmlFor="email">email</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input className='dark:text-black dark:bg-slate-500 border' {...register("password", { required: true, minLength: 5, maxLength: 99 })} id='password' type="password" />
          <label className='text-black dark:text-white' htmlFor="password">{t('password')}</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input className='dark:text-black dark:bg-slate-500 border' {...register("age", { required: true, pattern: /^[0-9]+$/ })} id='age' type="number" />
          <label className='text-black dark:text-white' htmlFor="age">{t('age')}</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Select onChange={(e) => handleSelect(e)} options={options} />
          <label className='text-black dark:text-white' htmlFor="role">{t('role')}</label>
        </div>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? `${t("loading")} ` : `${t("sign_up")}`}
        </button>
      </form>
    </div>
  )
}
