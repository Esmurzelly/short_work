import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../components/JobCard';
import { getAllJobs } from '../store/user/jobSlice';
import { Triangle } from 'react-loader-spinner';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRight, TbSquareRoundedArrowRightFilled } from "react-icons/tb";


export default function Home() {
    const { currentUser } = useSelector(state => state.user);
    const { jobs, loading, total } = useSelector(state => state.job);
    const dispatch = useDispatch();
    console.log(total)

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getAllJobs({ page, limit }))
    }, [dispatch, page, limit]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage(prevPage => prevPage - 1)
    };

    const handlePageClick = e => {
        setPage(e.selected);
    };

    const handleLimitChange = e => {
        setLimit(Number(e.target.value))
    }

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
                <>
                    <h1>{currentUser?.name}</h1>
                    <h1>{currentUser?.role}</h1>
                </>
            )}

            <div className='flex flex-col gap-4'>
x                <ul className='flex flex-row justify-around flex-wrap gap-4'>
                    {!loading && jobs && jobs.length > 0 ? (
                        jobs.map((item) => (
                            <JobCard key={item._id} jobItem={item} />
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
