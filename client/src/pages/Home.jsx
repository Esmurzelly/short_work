import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../components/JobCard';
import { getAllJobs } from '../store/user/jobSlice';
import { useState } from 'react';
import ChangeFilterData from '../components/ChangeFilterData';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import PaginateComponent from '../components/PaginateComponent';
import Skeleton from '../components/Skeleton';

export default function Home() {
    const [filterData, setFilterData] = useState({ searchTerm: '', order: 'desc' });

    const { currentUser } = useSelector(state => state.user);
    const { jobs, loading, total } = useSelector(state => state.job);
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const [showFilter, setShowFilter] = useState(false);
    const { t } = useTranslation();


    useEffect(() => {
        dispatch(getAllJobs({ page, limit, searchTerm: filterData.searchTerm, order: filterData.order }));
    }, [dispatch, page, limit]);

    const handlePageClick = e => {
        setPage(e.selected);
    };

    if (loading) return <Skeleton />

    return (
        <div className='flex flex-col flex-1 text-center text-black bg-white dark:text-white dark:bg-black'>
            {currentUser && (
                <div className='flex flex-col items-start'>
                    <h1>{t('name')}: {currentUser?.name}</h1>
                    <h1>{t('role')}: {currentUser?.role}</h1>
                </div>
            )}

            <div className='flex flex-col items-end gap-2'>
                <button onClick={() => setShowFilter(prevState => !prevState)}>{t('filter')}</button>
                {showFilter && <ChangeFilterData filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}
            </div>

            <div className='flex flex-col gap-4 mt-4'>
                <ul className='flex flex-row justify-around flex-wrap gap-4'>
                    {!loading && jobs && jobs.length > 0 ? (
                        jobs.map((item, index) => (
                            <JobCard key={`${item._id}-${index}`} jobItem={item} />
                        ))
                    ) : (
                        <p>{t('jobNotFound')}</p>
                    )}
                </ul>

                <PaginateComponent page={page} limit={limit} total={total} handlePageClick={handlePageClick} />
            </div>
        </div>
    )
}
