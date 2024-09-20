import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { updatejob } from '../store/user/jobSlice';

export default function ChangeJobData({ setModal }) {
    const [formData, setFormData] = useState([]);
    const { job, loading } = useSelector(state => state.job);
    const dispatch = useDispatch();

    const handleChange = e => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value
        });
      };

    const handleSubmit = e => {
        e.preventDefault();

        try {
            dispatch(updatejob({
                id: job._id,
                ...formData
            }));

            setModal(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='max-w-5xl mx-auto flex flex-row justify-between bg-stone-800 text-white p-2'>
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

                <button type='submit'>Update</button>
            </form>
            <IoMdClose onClick={() => setModal(false)} className='w-3 h-3' />
        </div>
    )
}
