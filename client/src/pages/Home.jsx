import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../components/JobCard';
import { getAllJobs } from '../store/user/jobSlice';

export default function Home() {
    const { currentUser } = useSelector(state => state.user);
    const { jobs } = useSelector(state => state.job);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllJobs())
    }, []);

    console.log(jobs)

    return (
        <div className='flex flex-col flex-1 text-center'>
            {currentUser && (
                <>
                    <h1>{currentUser?.name}</h1>
                    <h1>{currentUser?.role}</h1>
                </>
            )}

            <div className='flex flex-col justify-start items-start'>
                {jobs.map((item) => <JobCard key={item._id} jobItem={item} />)}
            </div>
        </div>
    )
}
