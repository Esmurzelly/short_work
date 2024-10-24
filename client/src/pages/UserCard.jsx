import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { unfacedAvatar } from '../utils/expvars';

export default function UserCard({ item }) {
    const { t } = useTranslation();

    return (
        <li className='flex flex-col bg-white text-black shadow-lg rounded-md w-full h-32 md:h-52 md:w-52'>
            <Link to={`/user/${item._id}`} className='h-full'>
                <div className='flex flex-row md:flex-col items-end md:items-start md:justify-between text-start gap-2 h-full'>
                    <img className='w-1/3 md:w-full h-full object-cover rounded-l-md' src={
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
    )
}
