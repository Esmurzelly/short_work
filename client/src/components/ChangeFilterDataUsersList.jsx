import React from 'react'
import { getAllUsers } from '../store/user/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeFilterDataUsersList({ page, limit, setFilterData, filterData }) {
    const dispatch = useDispatch();

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
                <span>Search: </span>
                <input className='border' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <button onClick={handleClearButton} type='button'>Clear</button>

            <button type='submit'>Find</button>
        </form>
    )
}
