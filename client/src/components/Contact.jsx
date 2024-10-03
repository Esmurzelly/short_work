import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Contact() {
    const [message, setMessage] = useState('');
    const { job, loading } = useSelector(state => state.job);
    const { t } = useTranslation();
    
    const { currentUser, jobOwner } = useSelector(state => state.user);

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    if (!job || loading) return <p>{t("loading")}</p>

    return (
        <div className='flex flex-col gap-2'>
            <p>
                {t("Contact_with")} <span className='font-semibold'>{jobOwner.name}</span>{' '}
                {t("for")} {job.title}
            </p>
            <textarea
                name='message'
                id='message'
                rows='2'
                value={message}
                onChange={onChange}
                placeholder='Enter your message here...'
                className='w-full border p-3 rounded-lg dark:text-white dark:bg-slate-800 resize-none'
            ></textarea>

            <Link
                to={`mailto:${jobOwner.email}?subject=Regarding ${job.title}&body=${message}`}
                className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
            >{t('Send_message')}</Link>
        </div>
    )
}
