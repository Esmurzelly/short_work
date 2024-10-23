import React from 'react'
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from 'react-icons/tb'
import ReactPaginate from 'react-paginate'

export default function PaginateComponent({ page, total, limit,  handlePageClick }) {
    return (
        <div className="flex flex-row justify-center items-center gap-5 list-none px-20 my-12">
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
    )
}
