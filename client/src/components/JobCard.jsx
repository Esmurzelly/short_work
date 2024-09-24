import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md';

export default function JobCard({ jobItem }) {

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/job/${jobItem._id}`}>
                <img
                    src={
                        jobItem.imageUrls && jobItem.imageUrls.length > 0 && `http://localhost:3000/static/jobAvatar/${jobItem.imageUrls[0]}` ||
                        'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                    }
                    alt='job cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />

                    <p>id: {jobItem._id}</p>
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg font-semibold text-slate-700'>
                        {jobItem.title}
                    </p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-sm text-gray-600 truncate w-full'>
                            {jobItem.address}
                        </p>
                    </div>

                    <p className='text-sm text-gray-600 line-clamp-2'>
                        {jobItem.description}
                    </p>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                        salary: {jobItem.salary}
                    </p>
                </div>
            </Link>
        </div>
  )
}
