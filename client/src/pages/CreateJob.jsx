import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { jobCreate } from '../store/user/jobSlice';

export default function CreateJob() {
  const { currentUser, loading } = useSelector(state => state.user);
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(jobCreate({
        ...formData,
        userRef: currentUser._id
      }));
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col flex-1'>
      <h1>Create job</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
        <div className='flex flex-row items-center gap-2'>
          <input className='bg-slate-700' onChange={handleChange} type="text" name="title" id="title" />
          <label htmlFor="title">title</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input className='bg-slate-700' onChange={handleChange} type="text" name="description" id="description" />
          <label htmlFor="description">description</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input className='bg-slate-700' onChange={handleChange} type="text" name="address" id="address" />
          <label htmlFor="address">address</label>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input className='bg-slate-700' onChange={handleChange} type="text" name="salary" id="salary" />
          <label htmlFor="salary">salary</label>
        </div>

        {/* <div className='flex flex-row items-center gap-2'>
          <input className='bg-slate-700' onChange={handleChange} type="text" name="neededSkils" id="neededSkils" />
          <label htmlFor="neededSkils">neededSkils</label>
        </div>

        <div className='flex flex-row items-center gap-2'> 
          <input className='bg-slate-700' onChange={handleChange} type="text" name="imageUrls" id="imageUrls" />
          <label htmlFor="imageUrls">imageUrls</label>
        </div>

        <div className='flex flex-row items-center gap-2'> 
          <input className='bg-slate-700' onChange={handleChange} type="text" name="loc" id="loc" />
          <label htmlFor="loc">loc</label>
        </div> */}

        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
