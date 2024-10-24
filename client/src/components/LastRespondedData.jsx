import React from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next';

export default function LastRespondedData({ array, showMoreClickedJobs, setShowMoreClickedJobs }) {
  const { t } = useTranslation();

    return (
        <div className='mt-2'>
            {array.slice(showMoreClickedJobs).reverse().map((item, index) =>
                <Link key={`${item.data._id}-${index}`} className='w-full flex flex-row items-center gap-2' to={`/job/${item.data._id}`}>
                    <div className='flex flex-row items-center gap-1'>
                        <p>{index + 1}.</p>
                        <img className='w-14' src={`${import.meta.env.VITE_HOST}/static/jobAvatar/${item.data.imageUrls[0]}`} alt="imageUrl" />
                    </div>
                    <div className=''>
                        <p>{item.data.title}</p>
                        <p>{item.data.salary}</p>
                    </div>
                </Link>)}
            {Math.abs(showMoreClickedJobs) >= array.length ? (
                <button onClick={() => setShowMoreClickedJobs(-3)}>{t('hide')}</button>
            ) : (
                <button onClick={() => setShowMoreClickedJobs(prevState => prevState - 3)}>{t('show_more')}</button>
            )}
        </div>
    )
}
