import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn, MdDriveFileRenameOutline, MdDescription, MdOutlineAttachMoney } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { defaultJobAvatar } from '../utils/expvars';

export default function JobCard({ jobItem }) {
    const { t } = useTranslation();

    return (
        <div className='shadow-md text-sm hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[45%] sm:w-[300px] 2xl:w-[350px] text-black bg-[#E7ECF0] dark:text-white dark:bg-slate-800'>
            <Link to={`/job/${jobItem._id}`}>
                <img
                    src={
                        jobItem.imageUrls && jobItem.imageUrls.length > 0 && `${import.meta.env.VITE_HOST}/static/jobAvatar/${jobItem.imageUrls[0]}` ||
                        defaultJobAvatar
                    }
                    alt='job cover'
                    className='h-[130px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />

                <div className='p-3 flex flex-col items-start gap-2 w-full'>
                    <div className='flex items-center gap-1'>
                        <MdDriveFileRenameOutline className='h-4 w-4 text-green-700' />
                        <p className='truncate w-full'>{jobItem.title}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='truncate w-full'>{jobItem.address}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <MdDescription className='h-4 w-4 text-green-700' />
                        <p className='truncate w-full'>{jobItem.description}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <MdOutlineAttachMoney className='h-5 w-4 text-green-700' />
                        <p className='truncate w-full'>{jobItem.salary}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
