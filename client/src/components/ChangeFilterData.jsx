import React, { memo, useCallback } from 'react'
import { getAllJobs } from '../store/user/jobSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";

const ChangeFilterData = memo(({ page, limit, setFilterData, filterData }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;

        setFilterData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }, [setFilterData])

    const handleClickButton = useCallback((e) => {
        setFilterData({
            ...filterData,
            order: e.target.id,
        })
    }, [setFilterData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(getAllJobs({ page, limit, searchTerm: filterData.searchTerm, order: filterData.order, minSalary: filterData.minSalary, maxSalary: filterData.maxSalary }))
    }, [dispatch, page, limit, filterData]);

    const handleClearButton = useCallback(() => {
        setFilterData({
            searchTerm: "",
            minSalary: "",
            maxSalary: "",
            order: "desc",
        });

        dispatch(getAllJobs({ page, limit }))
    }, [dispatch, page, limit, setFilterData]);

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-start mt-3 w-4/5 md:w-1/2 xl:w-1/3'>
            <div className='flex flex-row items-center gap-2 w-full justify-between'>
                <label htmlFor='searchTerm'>{t('Search')}: </label>
                <input className='border p-1 text-black md:w-2/3 focus:outline-none' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <div className='flex flex-row items-center gap-2 w-full justify-between'>
                <label htmlFor='minSalary'>{t('Min_Salary')}:</label>
                <input className='border p-1 text-black md:w-2/3 focus:outline-none' onChange={handleChange} value={filterData.minSalary || ""} type="number" name="minSalary" id="minSalary" />
            </div>

            <div className='flex flex-row items-center gap-2 w-full justify-between'>
                <label htmlFor='maxSalary'>{t('Max_Salary')}:</label>
                <input className='border p-1 text-black md:w-2/3 focus:outline-none' onChange={handleChange} value={filterData.maxSalary || ""} type="number" name="maxSalary" id="maxSalary" />
            </div>

            <div className='flex flex-row items-center gap-2 w-full justify-between'>
                <span>{t('order')}</span>
                <div className='flex flex-row items-center gap-4'>
                    <button type='button' className='flex items-center gap-1 text-xs' id='asc' onClick={handleClickButton}><IoArrowUpOutline className='w-4' /> {t('asc')}</button>
                    <button type='button' className='flex items-center gap-1 text-xs' id='desc' onClick={handleClickButton}><IoArrowDownOutline className='w-4' /> {t('desc')}</button>
                </div>
            </div>
            
            <button type="submit" className='flex flex-row items-center justify-around bg-blue-600 text-white text-center w-24'>
                {t('find')}
                <BiSearchAlt2 className='w-4' />
            </button>

            <button type='button' className='flex flex-row items-center justify-around bg-red-light text-white text-center w-24' onClick={handleClearButton}>
                {t('clear')}
                <MdDeleteForever className='w-4' />
            </button>

        </form>
    )
});

export default ChangeFilterData;