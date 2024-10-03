import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, jobCreate } from '../store/user/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateJob() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { currentUser, loading } = useSelector(state => state.user);
  // const [formData, setFormData] = useState([]);

  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.title?.type === "required" || errors.description?.type === "required" || errors.address?.type === "required" || errors.salary?.type === "required") {
      toast.error("Title, description, address and salary fields are required");
    }
    if (errors.title?.type === "minLength" || errors.description?.type === "minLength" || errors.address?.type === "minLength") {
      toast.error("Min length of each field is 5");
    }
    if (errors.title?.type === "maxLength" || errors.address?.type === "maxLength") {
      toast.error("Max length of title and address fields are 99");
    }
    if (errors.description?.type === "maxLength") {
      toast.error("Max length of description field is 250");
    }
    if (errors.salary?.type === "pattern") {
      toast.error("You should write only numbers");
    }
  }, [errors]);

  // const handleChange = e => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value
  //   });
  // };

  const handleFileChange = e => {
    setSelectedFile(e.target.files);
  };

  const handleSkillsChange = arr => {
    const newSelectedSkills = arr.map(item => item.label);
    setSelectedSkills(newSelectedSkills);
  };

  const handleSubmitForm = (data) => {
    console.log('formData from client', data); // ignor

    try {
      dispatch(jobCreate({
        ...data,
        userRef: currentUser._id,
        imageUrls: selectedFile,
        neededSkils: selectedSkills
      }));
      dispatch(getAllJobs());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const skillOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  if (loading) {
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
      <h1>Create job</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col items-start gap-4'>
        <div className='flex flex-row items-center gap-2'>
          <input {...register("title", { required: true, minLength: 5, maxLength: 99 })} className='bg-slate-700' type="text" name="title" id="title" />
          <label htmlFor="title">title</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input {...register("description", { required: true, minLength: 5, maxLength: 250 })} className='bg-slate-700' type="text" name="description" id="description" />
          <label htmlFor="description">description</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input {...register("address", { required: true, minLength: 5, maxLength: 99 })} className='bg-slate-700' type="text" name="address" id="address" />
          <label htmlFor="address">address</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input {...register("salary", { required: true, pattern: /^[0-9]+$/ })} className='bg-slate-700' type="text" name="salary" id="salary" />
          <label htmlFor="salary">salary</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input className='bg-slate-700' onChange={handleFileChange} multiple type="file" accept='image/*' name="imageUrls" id="imageUrls" />
          <label htmlFor="imageUrls">Choose Image/Images</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Select
            {...register("neededSkils", { required: false })}
            onChange={handleSkillsChange}
            options={skillOptions}
            isMulti
            name='neededSkils'
            id="neededSkils"
            classNamePrefix="select"
          />
          <label htmlFor="neededSkils">neededSkils / requirements</label>
        </div>

        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
