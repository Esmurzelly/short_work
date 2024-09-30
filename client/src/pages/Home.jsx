import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../components/JobCard';
import { getAllJobs } from '../store/user/jobSlice';
import { Triangle } from 'react-loader-spinner';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import ChangeFilterData from '../components/ChangeFilterData';


export default function Home() {
    const [filterData, setFilterData] = useState({ searchTerm: '', order: 'desc' });

    const { currentUser } = useSelector(state => state.user);
    const { jobs, loading, total } = useSelector(state => state.job);
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        dispatch(getAllJobs({ page, limit, searchTerm: filterData.searchTerm, order: filterData.order }));
    }, [dispatch, page, limit]);

    const handlePageClick = e => {
        setPage(e.selected);
    };

    if (loading) {
        return <div className='w-full min-h-screen flex items-center justify-center'>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return (
        <div className='flex flex-col flex-1 text-center'>
            {currentUser && (
                <div className='flex flex-col items-start'>
                    <h1>name: {currentUser?.name}</h1>
                    <h1>role: {currentUser?.role}</h1>
                </div>
            )}

            <div className='flex flex-col items-end gap-2'>
                <button onClick={() => setShowFilter(prevState => !prevState)}>Filter</button>
                {showFilter && <ChangeFilterData filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}
            </div>

            <div className='flex flex-col gap-4 mt-4'>
                <ul className='flex flex-row justify-around flex-wrap gap-4'>
                    {!loading && jobs && jobs.length > 0 ? (
                        jobs.map((item, index) => (
                            <JobCard key={`${item._id}-${index}`} jobItem={item} />
                        ))
                    ) : (
                        <p>No jobs found</p>
                    )}
                </ul>

                <div className="flex flex-row justify-center items-center gap-5 list-none px-20 mb-8">
                    <ReactPaginate
                        className='flex flex-row items-center gap-3'
                        pageClassName="mx-1"
                        previousClassName="" // prev button class
                        nextClassName="" // next button class
                        breakLabel="..."
                        containerClassName="flex"
                        activeClassName="bg-blue-600 text-white border-transparent rounded-lg"
                        previousLabel={<TbSquareRoundedArrowLeftFilled />}
                        nextLabel={<TbSquareRoundedArrowRightFilled />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={Math.ceil(total / limit)}
                        renderOnZeroPageCount={null}
                        forcePage={page}
                        pageLinkClassName="rounded-lg px-4 py-1 cursor-pointer"
                        previousLinkClassName="rounded-lg px-4 py-1 cursor-pointer"
                        nextLinkClassName="rounded-lg px-4 py-1 cursor-pointer"
                        breakLinkClassName="border-transparent"
                    />
                </div>
            </div>
        </div>
    )
}
