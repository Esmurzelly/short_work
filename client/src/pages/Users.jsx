import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { getAllUsers } from '../store/user/authSlice';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import ChangeFilterDataUsersList from '../components/ChangeFilterDataUsersList';

export default function Users() {
  const { allUsers, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({ searchTerm: '' });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [showFilter, setShowFilter] = useState(false);

  console.log(allUsers);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit }));
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
    <div className='flex flex-col flex-1 text-center w-full text-black bg-white dark:text-white dark:bg-black'>
      <span>Total number of all users: {allUsers.length}</span>

      <div className='flex flex-col items-end gap-2'>
        <button onClick={() => setShowFilter(prevState => !prevState)}>Filter</button>
        {showFilter && <ChangeFilterDataUsersList filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}
      </div>

      <ul className='flex flex-row flex-wrap gap-10 items-end w-full mt-4'>
        {allUsers.map((item) => (
          <li key={item._id} className='flex flex-col border h-36 w-36'>
            <Link to={`/user/${item._id}`} className='h-full'>
              <div className='flex flex-col items-start justify-between text-start h-full'>
                <img className='w-16' src={
                  item?.avatar === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
                    : (item?.avatar.includes('https://lh3.googleusercontent.com') || item?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${item?.avatar}`
                      : `http://localhost:3000/static/userAvatar/${item?.avatar}`
                } alt="" />
                <div className='flex flex-col'>
                  <p>name: {item.name.length >= 6 ? item.name.slice(0, 5) + "..." : item.name}</p>
                  <p>role: {item.role}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}