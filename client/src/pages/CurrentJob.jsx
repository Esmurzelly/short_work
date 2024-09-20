import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobById } from '../store/user/jobSlice';
import { useParams } from 'react-router-dom';


export default function CurrentJob() {
    const { job, loading } = useSelector(state => state.job);
    const dispatch = useDispatch();
    const params = useParams();
    

    console.log('cur job', job)

    useEffect(() => {
        dispatch(getJobById(params));
    }, [params.id]);

    if (!job || loading) return <p>Loading....</p>

    return (
        <div className='flex flex-1 flex-col'>
            {job && (
                <div>
                    <h1>Current Item</h1>
                    <p>title {job.title}</p>
                    <p>description {job.description}</p>
                    <p>address {job.address}</p>
                    <p>salary: {job.salary}</p>

                </div>
            )}
        </div>
    )
}
