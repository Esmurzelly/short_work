import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { getAllUsers } from '../store/user/authSlice';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import ChangeFilterDataUsersList from '../components/ChangeFilterDataUsersList';
import ReactPaginate from 'react-paginate';
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from 'react-icons/tb';

export default function Users() {
  const { allUsers, totalUsers, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({ searchTerm: '' });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [showFilter, setShowFilter] = useState(false);

  console.log("allUsers arr", allUsers);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, searchTerm: filterData.searchTerm }));
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
    <div className='flex flex-col flex-1 text-center w-full text-black bg-white dark:text-white dark:bg-black p-4'>
      <span>Total number of all users: {allUsers.length}</span>

      <div className='flex flex-col items-end gap-2'>
        <button onClick={() => setShowFilter(prevState => !prevState)}>Filter</button>
        {showFilter && <ChangeFilterDataUsersList filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}
      </div>

      <ul className='flex flex-row flex-wrap gap-10 items-end w-full mt-4'>
        {allUsers.map((item) => (
          <li key={item._id} className='flex flex-col border w-full h-32 md:h-52 md:w-52'> 
            <Link to={`/user/${item._id}`} className='h-full'>
              <div className='gap-2 flex flex-row md:flex-col items-end md:items-start md:justify-between text-start h-full'>
                <img className='w-16' src={
                  item?.avatar === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
                    : (item?.avatar.includes('https://lh3.googleusercontent.com') || item?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${item?.avatar}`
                      : `http://localhost:3000/static/userAvatar/${item?.avatar}`
                } alt="" />
                <div className='flex flex-col grow md:grow-0'>
                  <p>name: {item.name.length >= 6 ? item.name.slice(0, 5) + "..." : item.name}</p>
                  <p>role: {item.role}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
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
          pageCount={Math.ceil(totalUsers / limit)}
          renderOnZeroPageCount={null}
          forcePage={page}
          pageLinkClassName="rounded-lg px-4 py-1 cursor-pointer"
          previousLinkClassName="rounded-lg px-4 py-1 cursor-pointer"
          nextLinkClassName="rounded-lg px-4 py-1 cursor-pointer"
          breakLinkClassName="border-transparent"
        />
      </div>
    </div>
  )
}