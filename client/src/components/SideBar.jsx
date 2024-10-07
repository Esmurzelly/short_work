import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus, CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from 'react-i18next';

export default function SideBar() {
    const { t } = useTranslation();

    return (
        <div className='flex sticky bottom-0 text-white bg-beige py-3 px-4 z-50'>
            <nav className='w-full flex flex-row items-center justify-between'>
                <Link className='flex flex-col items-center gap-1' to={'/'}>
                    <IoHomeOutline className='w-7 h-7 rounded-full p-2 bg-red-light' />
                    <span className='text-xs'>{t('main')}</span>
                </Link>

                <Link className='flex flex-col items-center gap-1' to={'/users'}>
                    <CiUser className='w-7 h-7 rounded-full p-2 bg-blue-900' />
                    <span className='text-xs'>{t('userList')}</span>
                </Link>

                <Link className='flex flex-col items-center gap-1' to={'/create-job'}>
                    <CiCirclePlus className='w-7 h-7 rounded-full p-2 bg-grey-medium' />
                    <span className='text-xs'>{t('createJob')}</span>
                </Link>
                <Link className='flex flex-col items-center gap-1' to={'/profile'}>
                    <CgProfile className='w-7 h-7 rounded-full p-2 bg-yellow-950' />
                    <span className='text-xs'>{t('profile')}</span>
                </Link>
            </nav>
        </div>
    )
}
