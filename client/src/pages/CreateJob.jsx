import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, jobCreate } from '../store/user/jobSlice';

import { useForm } from 'react-hook-form';

import Select from 'react-select';

import { FcPicture } from "react-icons/fc";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from 'react-i18next';

import { skillOptions } from '../utils/expvars';

import Loader from '../components/Loader';


export default function CreateJob() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { currentUser, loading } = useSelector(state => state.user);

  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [PicsQuantity, setPicsQuantity] = useState(null);

  const pictureUploadRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const selectStyles = useMemo(() => ({
    option: (baseStyles) => ({
      ...baseStyles,
      color: `${document.documentElement.className === 'dark' ? "white" : "#334155"}`,
      backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`
    }),
    menu: styles => ({
      ...styles,
      border: `${document.documentElement.className === 'dark' ? "none" : ""}`,
      backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`
    }),
    control: styles => ({
      ...styles,
      border: `${document.documentElement.className === 'dark' ? "none" : ""}`,
      backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`, width: "100%"
    })
  }), []);

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

  const handleFileChange = e => {
    setSelectedFile(e.target.files);
    setPicsQuantity(e.target.files.length)
  };

  const handleSkillsChange = arr => {
    const newSelectedSkills = arr.map(item => item.label);
    setSelectedSkills(newSelectedSkills);
  };

  const handlePictureClick = () => {
    pictureUploadRef.current.click();
  };

  const handleSubmitForm = async (data) => {
    if (!data.title || !data.description || !data.address || !data.salary) {
      toast.error("All required fields must be filled");
      return;
    }

    try {
      const resultAction = await dispatch(jobCreate({
        ...data,
        userRef: currentUser._id,
        imageUrls: selectedFile,
        neededSkils: selectedSkills
      }));

      if (jobCreate.fulfilled.match(resultAction)) {
        toast.success("Job created successfully!");
        dispatch(getAllJobs());
        navigate('/');
      } else {
        toast.error(resultAction.error.message || "Failed to create job.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />

  return (
    <div className='flex flex-col flex-1 mt-14 text-black dark:text-white dark:bg-black px-3 md:text-xl'>
      <h1>{t('create_job')}</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='mt-4 flex flex-col items-start gap-4 md:gap-8'>
        <div className='flex flex-row items-center gap-2'>
          <input {...register("title", { required: true, minLength: 5, maxLength: 99 })} className='bg-slate-700 outline-none placeholder:py-1 px-2 md:py-1 text-white md:text-3xl' type="text" name="title" id="title" />
          <label htmlFor="title">{t('title')}</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input {...register("description", { required: true, minLength: 5, maxLength: 250 })} className='bg-slate-700 outline-none placeholder:py-1 px-2 md:py-1 text-white md:text-3xl' type="text" name="description" id="description" />
          <label htmlFor="description">{t('description')}</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input {...register("address", { required: true, minLength: 5, maxLength: 99 })} className='bg-slate-700 outline-none placeholder:py-1 px-2 md:py-1 text-white md:text-3xl' type="text" name="address" id="address" />
          <label htmlFor="address">{t('address')}</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input {...register("salary", { required: true, pattern: /^[0-9]+$/ })} className='bg-slate-700 outline-none placeholder:py-1 px-2 md:py-1 text-white md:text-3xl' type="number" name="salary" id="salary" />
          <label htmlFor="salary">{t('salary')}</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <FcPicture className='w-10 h-10' onClick={handlePictureClick} />

          <input ref={pictureUploadRef} className='bg-slate-700 w-1/4 hidden' onChange={handleFileChange} multiple type="file" accept='image/*' name="imageUrls" id="imageUrls" />
          <label htmlFor="imageUrls">{t('choose_image/images')}</label>

          <span>{t('quantity')}: {PicsQuantity || 0}</span>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Select
            styles={selectStyles}
            {...register("neededSkils", { required: false })}
            onChange={handleSkillsChange}
            options={skillOptions}
            isMulti
            name='neededSkils'
            id="neededSkils"
            classNamePrefix="select"
          />
          <label htmlFor="neededSkils">{t('neededSkils_requirements')}</label>
        </div>

        <button className='bg-blue-600 text-white text-center w-24' type='submit'>{t('Create')}</button>
      </form>
    </div>
  )
}
