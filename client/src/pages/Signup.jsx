import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/user/authSlice';

import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  // const [formData, setFormData] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (errors.name?.type === 'required' || errors.email?.type === 'required' || errors.password?.type === 'required' || errors.age?.type === 'required') toast.error("Name, Email, Password and Age fields are required");
    if (errors.email?.type === 'minLength' || errors.password?.type === 'minLength') toast.error("Min length of each field is 5");
    if (errors.name?.type === 'minLength') toast.error("Min length of name field is 3");
    if (errors.name?.type === 'minLength' || errors.email?.type === 'maxLength' || errors.password?.type === 'maxLength') toast.error("Max length of each field is 99");
    if (errors.age?.type === 'pattern') toast.error("Age field includes only nubmers");
  }, [errors]);

  // const handleChange = e => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value
  //   });
  // };

  const handleSubmitForm = async (data) => {
    try {
      dispatch(registerUser({
        ...data,
        "role": selectedOption
      }))

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const handleSelect = (selectedOptionItem) => {
    setSelectedOption(selectedOptionItem.value)
    // setFormData({
    //   ...formData,
    //   "role": selectedOption.value
    // })
  };

  const options = [
    { value: 'employer', label: 'employer' },
    { value: 'employee', label: 'employee' },
  ];

  return (
    <div className='w-full bg-slate-600 h-screen'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className='flex flex-row items-center gap-4'>
          <input {...register("name", { required: true, minLength: 3, maxLength: 99 })} id='name' type="text" />
          <label className='text-white' htmlFor="name">name</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input {...register("email", { required: true, minLength: 5, maxLength: 99 })} id='email' type="email" />
          <label className='text-white' htmlFor="email">email</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input {...register("password", { required: true, minLength: 5, maxLength: 99 })} id='password' type="password" />
          <label className='text-white' htmlFor="password">password</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <input {...register("age", { required: true, pattern: /^[0-9]+$/ })} id='age' type="number" />
          <label className='text-white' htmlFor="age">age</label>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Select onChange={(e) => handleSelect(e)} options={options} />
          <label className='text-white' htmlFor="role">role</label>
        </div>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
