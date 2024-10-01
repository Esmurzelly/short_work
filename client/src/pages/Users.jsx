import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { getAllUsers } from '../store/user/authSlice';
import { Triangle } from 'react-loader-spinner';

export default function Users() {
  const { allUsers, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

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
    <div className='flex flex-col flex-1 text-center w-full'>
      <span>Total number of all users: {allUsers.length}</span>

      <ul className='flex flex-row flex-wrap gap-10 items-end w-full mt-4'>
        {allUsers.map((item) => (
          <li key={item._id} className='flex flex-col items-end'>
            <div className='flex flex-col justify-start items-start'>
              <img className='w-16' src={item.avatar} alt="" />
              <p>name: {item.name}</p>
              <p>role: {item.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}