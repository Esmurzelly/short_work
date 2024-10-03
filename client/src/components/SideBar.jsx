import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus, CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from 'react-i18next';

export default function SideBar() {
    const { t } = useTranslation();

    return (
        <div className='flex sticky bottom-0 bg-zinc-900 text-white'>
            <nav className='w-full flex flex-row items-center justify-between'>
                <Link className='flex flex-row items-center gap-1' to={'/'}>
                    <span className='text-lg'>{t('main')}</span>
                    <IoHomeOutline className='w-7' />
                </Link>

                <Link className='flex flex-row items-center gap-1' to={'/users'}>
                    <span className='text-lg'>{t('userList')}</span>
                    <CiUser className='w-7' />
                </Link>

                <Link className='flex flex-row items-center gap-1' to={'/create-job'}>
                    <span className='text-lg'>{t('createJob')}</span>
                    <CiCirclePlus className='w-7' />
                </Link>
                <Link className='flex flex-row items-center gap-1' to={'/profile'}>
                    <span className='text-lg'>{t('profile')}</span>
                    <CgProfile className='w-7' />
                </Link>
            </nav>
        </div>
    )
}
