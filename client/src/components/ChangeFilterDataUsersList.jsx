import React from 'react'
import { getAllUsers } from '../store/user/authSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ChangeFilterDataUsersList({ page, limit, setFilterData, filterData }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = e => {
        setFilterData({
            ...filterData,
            [e.target.id]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getAllUsers({ page, limit, searchTerm: filterData.searchTerm }))
    };

    const handleClearButton = () => {
        setFilterData({
            searchTerm: "",
        });

        dispatch(getAllUsers({ page, limit }))
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-start'>
            <div>
                <span>{t("Search")}: </span>
                <input className='border text-black dark:text-white dark:bg-slate-800' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <button onClick={handleClearButton} type='button'>{t("clear")}</button>

            <button type='submit'>{t("find")}</button>
        </form>
    )
}
