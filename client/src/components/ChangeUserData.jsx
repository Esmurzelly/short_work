import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/user/authSlice';
import { useTranslation } from 'react-i18next';
import { options } from '../utils/expvars';

export default function ChangeUserData({ setModal }) {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState([]);
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
        <div className='max-w-5xl mx-auto flex flex-row justify-between p-3 rounded-md text-black bg-beige-medium dark:text-white dark:bg-black'>
            <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new name' className='px-1 w-full bg-white dark:bg-slate-700' onChange={handleChange} type="text" name="name" id="name" />
                    <label htmlFor="name">{t('name')}</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new email' className='px-1 w-full bg-white dark:bg-slate-700' onChange={handleChange} type="email" name="email" id="email" />
                    <label htmlFor="email">Email</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new password' className='px-1 w-full bg-white dark:bg-slate-700' onChange={handleChange} type="password" name="password" id="password" />
                    <label htmlFor="password">{t('password')} </label>
                </div>

                <div className='flex flex-row items-center gap-2 w-full'>
                    <Select styles={{
                        option: (baseStyles) => ({
                            ...baseStyles,
                            color: `${document.documentElement.className === 'dark' ? "white" : "#334155"}`,
                            backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`
                        }),
                        menu: styles => ({ ...styles, backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}` }),
                        control: styles => ({ ...styles, backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`, width: "100%" })
                    }} className='w-full dark:bg-slate-700' onChange={(e) => handleSelect(e)} options={options} />
                    <label className='text-black dark:text-white' htmlFor="role">{t('role')}</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <textarea className='px-1 w-full bg-white dark:bg-slate-700 resize-none dark:text-black' onChange={handleChange} placeholder='about yourself' name="about" id="about"></textarea>
                    <label className='text-black dark:text-white' htmlFor="about">{t('about')}</label>
                </div>

                <button type='submit'>{t('update')}</button>
            </form>
            <IoMdClose onClick={() => setModal(false)} className='w-5 h-5 cursor-pointer' />
        </div>
    )
}
