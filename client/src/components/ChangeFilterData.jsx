import React from 'react'
import { getAllJobs } from '../store/user/jobSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ChangeFilterData({ page, limit, setFilterData, filterData }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = e => {
        setFilterData({
            ...filterData,
            [e.target.id]: e.target.value
        })
    }

    const handleClickButton = e => {
        setFilterData({
            ...filterData,
            order: e.target.id,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getAllJobs({ page, limit, searchTerm: filterData.searchTerm, order: filterData.order, minSalary: filterData.minSalary, maxSalary: filterData.maxSalary }))
    };

    const handleClearButton = () => {
        setFilterData({
            searchTerm: "",
            minSalary: "",
            maxSalary: "",
            order: "desc",
        });

        dispatch(getAllJobs({ page, limit }))
    }


    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-start'>
            <div>
                <span>{t('Search')}: </span>
                <input className='border' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <div className='flex flex-col items-start'>
                <div className='flex flex-row items-center gap-1'>
                    <span>{t('Min_Salary')}:</span>
                    <input className='border' onChange={handleChange} value={filterData.minSalary || ""} type="number" name="minSalary" id="minSalary" />
                </div>

                <div className='flex flex-row items-center gap-1'>
                    <span>{t('Max_Salary')}:</span>
                    <input className='border' onChange={handleChange} value={filterData.maxSalary || ""} type="number" name="maxSalary" id="maxSalary" />
                </div>

            </div>


            <div>
                <span>{t('order')}</span>
                <button id='asc' onClick={handleClickButton}>{t('asc')}</button>
                <button id='desc' onClick={handleClickButton}>{t('desc')}</button>
            </div>

            <button onClick={handleClearButton} type='button'>{t('clear')}</button>

            <button type='submit'>{t('find')}</button>
        </form>
    )
}
