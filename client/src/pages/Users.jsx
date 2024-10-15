import React, { useCallback } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { getAllUsers } from '../store/user/authSlice';
import { Link } from 'react-router-dom';
import ChangeFilterDataUsersList from '../components/ChangeFilterDataUsersList';
import { useTranslation } from 'react-i18next';
import { unfacedAvatar } from '../utils/expvars';
import PaginateComponent from '../components/PaginateComponent';
import Skeleton from '../components/Skeleton';
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

export default function Users() {
  const { allUsers, totalUsers, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({ searchTerm: '' });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

  console.log("allUsers arr", allUsers);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, searchTerm: filterData.searchTerm }));
  }, [dispatch, page, limit]);

  const handlePageClick = useCallback((e) => {
    setPage(e.selected);
  }, []);

  if (loading) return <Skeleton />

  return (
    <div className='flex flex-col flex-1 mt-14 text-center w-full text-black bg-grey-light dark:bg-black px-3'>
      <span>{t('total_users')}: {allUsers?.length}</span>

      <div>
        <button className='flex flex-row items-center gap-2' onClick={() => setShowFilter(prevState => !prevState)}>
          {t('filter')}
          {showFilter ? <IoArrowUpOutline className='w-4' /> : <IoArrowDownOutline className='w-4' />}
        </button>
      </div>

      {showFilter && <ChangeFilterDataUsersList filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}

      <ul className='flex flex-row flex-wrap gap-10 items-end w-full mt-4'>
        {allUsers?.map((item) => (
          <li key={item._id} className='flex flex-col bg-white rounded-md w-full h-32 md:h-52 md:w-52'>
            <Link to={`/user/${item._id}`} className='h-full'>
              <div className='flex flex-row md:flex-col items-end md:items-start md:justify-between text-start gap-2 h-full'>
                <img className='w-1/3 h-full object-cover rounded-l-md' src={
                  item?.avatar === null ? unfacedAvatar
                    : (item?.avatar.includes('https://lh3.googleusercontent.com') || item?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${item?.avatar}`
                      : `${import.meta.env.VITE_HOST}/static/userAvatar/${item?.avatar}`
                } alt="" />
                <div className='flex flex-col grow md:grow-0'>
                  <p>{t('name')}: {item.name.length >= 6 ? item.name.slice(0, 5) + "..." : item.name}</p>
                  <p>{t('role')}: {item.role}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <PaginateComponent page={page} limit={limit} total={totalUsers} handlePageClick={handlePageClick} />
    </div>
  )
}