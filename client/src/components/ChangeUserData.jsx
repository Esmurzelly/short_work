import React, { memo, useCallback } from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/user/authSlice';
import { useTranslation } from 'react-i18next';
import { options } from '../utils/expvars';

const ChangeUserData = memo(({ setModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState([]);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = useCallback((e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }, []);

    console.log('formData', formData);

    const handleSelect = useCallback((selectedOption) => {
        setFormData({
            ...formData,
            "role": selectedOption.value
        })
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            await dispatch(updateUser({
                id: currentUser._id,
                role: formData.role,
                ...formData
            }));

            setModal(false);
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, currentUser, formData]);

    return (
        <div className='max-w-5xl mx-auto flex flex-row justify-between p-3 rounded-md text-black bg-[#2A4BA0] dark:text-white dark:bg-black'>
            <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new name' className='px-1 focus:outline-none w-full bg-white dark:bg-slate-700' onChange={handleChange} type="text" name="name" id="name" />
                    <label className="text-white" htmlFor="name">{t('name')}</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new email' className='px-1 focus:outline-none w-full bg-white dark:bg-slate-700' onChange={handleChange} type="email" name="email" id="email" />
                    <label className="text-white" htmlFor="email">Email</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new password' className='px-1 focus:outline-none w-full bg-white dark:bg-slate-700' onChange={handleChange} type="password" name="password" id="password" />
                    <label className="text-white" htmlFor="password">{t('password')} </label>
                </div>

                <div className='flex flex-row items-center gap-2 w-full'>
                    <Select styles={{
                        option: (baseStyles) => ({
                            ...baseStyles,
                            color: `${document.documentElement.className === 'dark' ? "white" : "#334155"}`,
                            backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`
                        }),
                        menu: styles => ({ ...styles, border: "none", backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}` }),
                        control: styles => ({ ...styles, border: "none", backgroundColor: `${document.documentElement.className === 'dark' ? "#334155" : "white"}`, width: "100%" })
                    }} className='w-full focus:outline-none dark:bg-slate-700' onChange={(e) => handleSelect(e)} options={options} />
                    <label className='text-white' htmlFor="role">{t('role')}</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <textarea className='px-1 w-full focus:outline-none bg-white dark:bg-slate-700 resize-none dark:text-black' onChange={handleChange} placeholder='about yourself' name="about" id="about"></textarea>
                    <label className='text-white' htmlFor="about">{t('about')}</label>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input placeholder='Enter new number' className='px-1 focus:outline-none w-full bg-white dark:bg-slate-700' onChange={handleChange} type="tel" name="tel" id="tel" />
                    <label className="text-white" htmlFor="tel">Number</label>
                </div>

                <button className='text-white' type='submit'>{t('update')}</button>
            </form>
            <IoMdClose onClick={() => setModal(false)} className='w-5 h-5 cursor-pointer' />
        </div>
    )
});

export default ChangeUserData;