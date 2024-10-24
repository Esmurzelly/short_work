import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { getAllUsers } from '../store/user/authSlice';
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

import ChangeFilterDataUsersList from '../components/ChangeFilterDataUsersList';
import PaginateComponent from '../components/PaginateComponent';
import Skeleton from '../components/Skeleton';

import UserCard from './UserCard';

export default function Users() {
  const { allUsers, totalUsers, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({ searchTerm: '' });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, searchTerm: filterData.searchTerm }));
  }, [dispatch, page, limit]);

  const handlePageClick = useCallback((e) => {
    setPage(e.selected);
  }, []);

  if (loading) return <Skeleton />

  return (
    <div className='flex flex-col flex-1 mt-14 text-center w-full text-black dark:bg-black dark:text-white px-3'>
      <span>{t('total_users')}: {totalUsers}</span>

      <div>
        <button className='flex flex-row items-center gap-2' onClick={() => setShowFilter(prevState => !prevState)}>
          {t('filter')}
          {showFilter ? <IoArrowUpOutline className='w-4' /> : <IoArrowDownOutline className='w-4' />}
        </button>
      </div>

      {showFilter && <ChangeFilterDataUsersList filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}

      <ul className='flex flex-row flex-wrap gap-10 items-end w-full mt-4'>
        {allUsers?.map((item) => (
          <UserCard item={item} key={item._id} />
        ))}
      </ul>

      <PaginateComponent page={page} limit={limit} total={totalUsers} handlePageClick={handlePageClick} />
    </div>
  )
}