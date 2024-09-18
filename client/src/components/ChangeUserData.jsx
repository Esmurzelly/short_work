import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/user/authSlice';

export default function ChangeUserData({ setModal }) {
    const { currentUser, loading } = useSelector(state => state.user);
    const [formData, setFormData] = useState([]);
    const dispatch = useDispatch();

    console.log('formData data from chaneDataComponents', formData);
    console.log('currentUser', currentUser);

    const options = [
        { value: 'admin', label: 'admin' },
        { value: 'user', label: 'user' },
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

        console.log('e.target.id', e.target);

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
        <div className='max-w-5xl mx-auto flex flex-row justify-between bg-stone-800 text-white p-2'>
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

                <button type='submit'>Update</button>
            </form>
            <IoMdClose onClick={() => setModal(false)} className='w-3 h-3' />
        </div>
    )
}
