import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/user/authSlice';

export default function ChangeUserData({ setModal }) {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState([]);
    const dispatch = useDispatch();

    const options = [
        { value: 'employer', label: 'employer' },
        { value: 'employee', label: 'employee' },
    ];

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSelect = (selectedOption) => {
        setFormData({
            ...formData,
            "role": selectedOption.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        try {
            dispatch(updateUser({
                id: currentUser._id,
                role: formData.role,
                ...formData
            }));

            setModal(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='max-w-5xl mx-auto flex flex-row justify-between p-2 text-black bg-white dark:text-white dark:bg-black'>
            <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
                <div className='flex flex-row items-center gap-2'>
                    <input className='bg-slate-700' onChange={handleChange} type="text" name="name" id="name" />
                    <label htmlFor="name">name</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input className='bg-slate-700' onChange={handleChange} type="email" name="email" id="email" />
                    <label htmlFor="email">email</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input className='bg-slate-700' onChange={handleChange} type="password" name="password" id="password" />
                    <label htmlFor="password">password</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <Select onChange={(e) => handleSelect(e)} options={options} />
                    <label className='text-white' htmlFor="role">role</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <textarea className='resize-none w-6/12 border dark:text-black' onChange={handleChange} placeholder='about yourself' name="about" id="about"></textarea>
                    <label className='text-white' htmlFor="about">About yourself</label>
                </div>

                <button type='submit'>Update</button>
            </form>
            <IoMdClose onClick={() => setModal(false)} className='w-3 h-3 cursor-pointer' />
        </div>
    )
}
