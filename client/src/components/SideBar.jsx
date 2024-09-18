import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

export default function SideBar() {
  return (
    <div className='flex'>
        <nav className='w-full flex flex-row items-center justify-between'>
            <Link className='flex flex-row items-center gap-1' to={'/'}>
                <span className='text-lg'>Main</span>
                <IoHomeOutline className='w-7' />
            </Link>
            {/* <Link className='flex flex-row items-center gap-1' to={'/'}>
                <span className='text-lg'>Job List</span>
                <IoHomeOutline className='w-7' />
            </Link> */}
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