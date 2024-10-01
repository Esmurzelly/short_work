import React from 'react'
import { getAllJobs } from '../store/user/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeFilterData({ page, limit, setFilterData, filterData }) {
    const dispatch = useDispatch();
    const { jobs, loading, total } = useSelector(state => state.job);

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
                <span>Search: </span>
                <input className='border' onChange={handleChange} value={filterData.searchTerm || ""} type="text" name="searchTerm" id="searchTerm" />
            </div>

            <div className='flex flex-col items-start'>
                <div className='flex flex-row items-center gap-1'>
                    <span>Min Salary:</span>
                    <input className='border' onChange={handleChange} value={filterData.minSalary || ""} type="number" name="minSalary" id="minSalary" />
                </div>

                <div className='flex flex-row items-center gap-1'>
                    <span>Max Salary:</span>
                    <input className='border' onChange={handleChange} value={filterData.maxSalary || ""} type="number" name="maxSalary" id="maxSalary" />
                </div>

            </div>


            <div>
                <span>order</span>
                <button id='asc' onClick={handleClickButton}>Asc</button>
                <button id='desc' onClick={handleClickButton}>Desc</button>
            </div>

            <button onClick={handleClearButton} type='button'>Clear</button>

            <button type='submit'>Find</button>
        </form>
    )
}
