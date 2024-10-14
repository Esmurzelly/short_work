import React, { memo, useCallback } from 'react'
import { getAllUsers } from '../store/user/authSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MdDeleteForever } from 'react-icons/md';
import { BiSearchAlt2 } from 'react-icons/bi';

const ChangeFilterDataUsersList = memo(({ page, limit, setFilterData, filterData }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = useCallback((e) => {
        setFilterData({
            ...filterData,
            [e.target.id]: e.target.value
        })
    }, [setFilterData, filterData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(getAllUsers({ page, limit, searchTerm: filterData.searchTerm }))
    }, [dispatch, page, limit, filterData]);

    const handleClearButton = useCallback(() => {
        setFilterData({
            searchTerm: "",
        });

        dispatch(getAllUsers({ page, limit }))
    }, [dispatch, page, limit]);

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-start gap-2 mt-3'>
            <div className='flex flex-row items-center justify-between w-4/5'>
                <span>{t("Search")}: </span>
                <input className='border text-black dark:text-white dark:bg-slate-800' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <button className='flex flex-row items-center justify-around bg-red-light text-white text-center w-24' onClick={handleClearButton} type='button'>
                {t("clear")}
                <MdDeleteForever className='w-4' />
            </button>

            <button className='flex flex-row items-center justify-around bg-blue-600 text-white text-center w-24' type='submit'>
                {t("find")}
                <BiSearchAlt2 className='w-4' />
            </button>
        </form>
    )
});

export default ChangeFilterDataUsersList;