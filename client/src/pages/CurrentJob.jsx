import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletejob, getAllJobs, getJobById } from '../store/user/jobSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChangeJobData from '../components/ChangeJobData';
import { clickedJobsByUser, findUserByUserRefJob, getAllUsers } from '../store/user/authSlice';
import Contact from '../components/Contact';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import 'swiper/css';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import { defaultJobAvatar } from '../utils/expvars';


export default function CurrentJob() {
    const { job, loading } = useSelector(state => state.job);
    const { currentUser, jobOwner, allUsers } = useSelector(state => state.user);
    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState(false);
    const [clickedPeople, setClickedPeople] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const filteredUsers = allUsers.filter(user => user.clickedJobs.includes(params.id));
    const { t } = useTranslation();

    console.log('cur job', job);

    useEffect(() => {
        dispatch(getJobById(params));
        dispatch(findUserByUserRefJob(params.id))
        dispatch(getAllUsers());
    }, [params.id]);


    const handleDelete = useCallback(() => {
        try {
            dispatch(deletejob({ id: job._id }));
            dispatch(getAllJobs());
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, navigate, job]);

    const handleSendData = useCallback(() => {
        try {
            dispatch(clickedJobsByUser({ id: job._id }));
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, job]);


    if (!job || loading || !jobOwner) return <Loader />


    return (
        <div className='flex flex-1 flex-col text-black bg-white dark:text-white dark:bg-black'>
            {job && (
                <div>
                    <h1>{t('current_item')}</h1>
                    <p>{t('title')}: {job.title}</p>
                    <p>{t('description')}: {job.description}</p>
                    <p>{t('address')}: {job.address}</p>
                    <p>{t('salary')}: {job.salary}</p>
                    {job.imageUrls && <p>{t('avatar')}: <img className='w-32 h-32 object-cover' src={job.imageUrls.length > 0 ? `${import.meta.env.VITE_HOST}/static/jobAvatar/${job?.imageUrls[0]}` : defaultJobAvatar} alt="imgUrl" /></p>}
                    <p>{t('owner')}: {jobOwner?.name}</p>
                    <p>Number: <a href={`tel:${jobOwner?.tel}`}>{jobOwner?.tel}</a></p>

                    <div className='flex flex-row items-center gap-2'>
                        <p>{t('skills')}: </p>
                        <ul className='flex flex-row items-center gap-1'>
                            {job.neededSkils && job.neededSkils.map((item, index) => <li key={index}>{item}, </li>)}
                        </ul>
                    </div>
                </div>
            )}

            {modal && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='absolute inset-0 bg-black opacity-50'></div>
                    <div className='relative bg-white p-1 rounded-lg shadow-lg z-10'>
                        <ChangeJobData setModal={setModal} />
                    </div>
                </div>
            )}

            {job.userRef == currentUser?._id && (
                <div className='flex flex-col gap-4'>
                    <button onClick={() => setModal(true)} className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('change')}</button>
                    <button onClick={handleDelete} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Delete')}</button>
                </div>
            )}

            {job.userRef !== currentUser._id && <div className='flex flex-col items-start gap-2'>
                <button onClick={() => setContact(prevState => !prevState)} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {t('contact_with_owner')}
                </button>
                {contact && <Contact />}
            </div>}

            {job.userRef == currentUser._id && <div className='flex flex-col gap-4'>
                <button onClick={() => setClickedPeople(prevState => !prevState)} className='bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    Watch people who clicked
                </button>
                {clickedPeople && filteredUsers.map((user, index) => (
                    <Link className='w-full bg-beige-light flex flex-row items-center gap-2' to={`/user/${user._id}`} key={user._id}>
                        <div className='flex flex-row items-center gap-1'>
                            <p>{index + 1}.</p>
                            <img className='w-14' src={`${import.meta.env.VITE_HOST}/static/userAvatar/${user.avatar}`} alt="avatar" />
                        </div>
                        <div className=''>
                            <p>{user.name}</p>
                            <p>{user.email
                            }</p>
                        </div>
                    </Link>
                ))}
            </div>}

            {currentUser._id !== jobOwner._id && <button onClick={handleSendData} className='mt-4 bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                Click for sending your data to the employer
            </button>}

            <button onClick={() => navigate(-1)} className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Back')}</button>

            {job && job?.imageUrls && (
                <div>
                    <Swiper navigation={true} modules={[Navigation]}>
                        {job.imageUrls.map((item) => (
                            <SwiperSlide key={item}>
                                <div
                                    className='h-[550px] w-full'
                                    style={{
                                        background: `url(${import.meta.env.VITE_HOST}/static/jobAvatar/${item}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    )
}
