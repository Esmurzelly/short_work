import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus, CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

export default function SideBar() {
  return (
    <div className='flex sticky bottom-0 bg-zinc-900 text-white'>
        <nav className='w-full flex flex-row items-center justify-between'>
            <Link className='flex flex-row items-center gap-1' to={'/'}>
                <span className='text-lg'>Main</span>
                <IoHomeOutline className='w-7' />
            </Link>

            <Link className='flex flex-row items-center gap-1' to={'/users'}>
                <span className='text-lg'>Users List</span>
                <CiUser className='w-7' />
            </Link>

            <Link className='flex flex-row items-center gap-1' to={'/create-job'}>
                <span className='text-lg'>Create job</span>
                <CiCirclePlus className='w-7' />
            </Link>
            <Link className='flex flex-row items-center gap-1' to={'/profile'}>
                <span className='text-lg'>Profile</span>
                <CgProfile className='w-7' />
            </Link>
        </nav>
    </div>
  )
}
