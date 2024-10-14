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
        setFilterData({
            ...filterData,
            [e.target.id]: e.target.value
        })
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
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2 items-start mt-3'>
            <div className='flex flex-row items-center justify-between w-4/5'>
                <span>{t('Search')}: </span>
                <input className='border' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <div className='flex flex-row items-center justify-between w-4/5'>
                <span>{t('Min_Salary')}:</span>
                <input className='border' onChange={handleChange} value={filterData.minSalary || ""} type="number" name="minSalary" id="minSalary" />
            </div>

            <div className='flex flex-row items-center justify-between w-4/5'>
                <span>{t('Max_Salary')}:</span>
                <input className='border' onChange={handleChange} value={filterData.maxSalary || ""} type="number" name="maxSalary" id="maxSalary" />
            </div>

            <div className='flex flex-row items-center justify-between w-4/5'>
                <span>{t('order')}</span>
                <div className='flex flex-row items-center gap-4'>
                    <button className='flex items-center gap-1' id='asc' onClick={handleClickButton}><IoArrowUpOutline className='w-4' /> {t('asc')}</button>
                    <button className='flex items-center gap-1' id='desc' onClick={handleClickButton}><IoArrowDownOutline className='w-4' /> {t('desc')}</button>
                </div>
            </div>
            
            <button className='flex flex-row items-center justify-around bg-blue-600 text-white text-center w-24' type='submit'>
                {t('find')}
                <BiSearchAlt2 className='w-4' />
            </button>

            <button className='flex flex-row items-center justify-around bg-red-light text-white text-center w-24' onClick={handleClearButton} type='button'>
                {t('clear')}
                <MdDeleteForever className='w-4' />
            </button>

        </form>
    )
});

export default ChangeFilterData;