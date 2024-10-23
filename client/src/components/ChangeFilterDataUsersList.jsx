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
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-start mt-3 w-4/5 md:w-1/2 xl:w-1/3'>
            <div className='flex flex-row items-center gap-2 w-full justify-between'>
                <label htmlFor="searchTerm">{t("Search")}:</label>
                <input className='border p-1 text-black md:w-2/3 focus:outline-none dark:text-white dark:bg-slate-800' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
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