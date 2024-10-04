import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { getAllUsers } from '../store/user/authSlice';
import { Link } from 'react-router-dom';
import ChangeFilterDataUsersList from '../components/ChangeFilterDataUsersList';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import { unfacedAvatar } from '../utils/expvars';
import PaginateComponent from '../components/PaginateComponent';
import Skeleton from '../components/Skeleton';

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

  const handlePageClick = e => {
    setPage(e.selected);
  };

  if (loading) return <Skeleton />

  return (
    <div className='flex flex-col flex-1 text-center w-full text-black bg-white dark:text-white dark:bg-black p-4'>
      <span>{t('total_users')}: {allUsers.length}</span>

      <div className='flex flex-col items-end gap-2'>
        <button onClick={() => setShowFilter(prevState => !prevState)}>{t('filter')}</button>
        {showFilter && <ChangeFilterDataUsersList filterData={filterData} setFilterData={setFilterData} page={page} limit={limit} />}
      </div>

      <ul className='flex flex-row flex-wrap gap-10 items-end w-full mt-4'>
        {allUsers.map((item) => (
          <li key={item._id} className='flex flex-col border w-full h-32 md:h-52 md:w-52'> 
            <Link to={`/user/${item._id}`} className='h-full'>
              <div className='gap-2 flex flex-row md:flex-col items-end md:items-start md:justify-between text-start h-full'>
                <img className='w-16' src={
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

      <PaginateComponent page={page} limit={limit} total={totalUsers}  handlePageClick={handlePageClick} />
    </div>
  )
}