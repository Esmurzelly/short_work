import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { deletejob, getAllJobs, getJobById } from '../store/user/jobSlice';
import { clickedJobsByUser, findUserByUserRefJob, getAllUsers } from '../store/user/authSlice';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle'
import 'swiper/css/pagination';

import { useTranslation } from 'react-i18next';

import { unfacedAvatar } from '../utils/expvars';

import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

import ChangeJobData from '../components/ChangeJobData';
import Loader from '../components/Loader';
import Contact from '../components/Contact';


export default function CurrentJob() {
    const { job, loading } = useSelector(state => state.job);
    const { currentUser, jobOwner, allUsers } = useSelector(state => state.user);
    const [modal, setModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [contact, setContact] = useState(false);
    const [clickedPeople, setClickedPeople] = useState(false);
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const filteredUsers = allUsers?.filter(user => user.clickedJobs.includes(params.id));
    const { t } = useTranslation();

    const handleShowDdetails = () => {
        setShowDetails(prev => !prev)
    }

    useEffect(() => {
        const handleEvent = (event) => {
            if (modalRef.current &&
                (event.type === 'mousedown' && !modalRef.current.contains(event.target)) ||
                (event.type === 'keydown' && event.keyCode === 27)) {
                setModal(false);
            }
        };

        if (modal) {
            document.addEventListener('mousedown', handleEvent);
            document.addEventListener('keydown', handleEvent);
        }

        return () => {
            document.removeEventListener('mousedown', handleEvent);
            document.removeEventListener('keydown', handleEvent);
        };
    }, [modal]);

    useEffect(() => {
        dispatch(getJobById(params));
        dispatch(findUserByUserRefJob(params.id));
        dispatch(getAllUsers({ page: 0 }));
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
        <div className='flex flex-1 flex-col mt-14 text-black bg-white dark:text-white dark:bg-black'>
            {job && job?.imageUrls && (
                <div>
                    <Swiper modules={[Navigation, Pagination]} pagination={{ clickable: true }}>
                        {job.imageUrls.map((item) => (
                            <SwiperSlide key={item}>
                                <div
                                    className='h-[200px] md:h-[400px] w-full'
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

            {job && (
                <div className='flex flex-col items-start gap-1 w-full p-1'>
                    <p className='text-xl w-1/3 break-words'>{job.title}</p>
                    <div className='mt-3 flex flex-row items-start justify-between w-full'>
                        <p className='text-xl'>$ {job.salary}</p>
                        <p className='text-base text-right break-words w-1/3'>{t('address')}: {job.address}</p>
                    </div>

                    <p>{t('number')}: <a href={`tel:${jobOwner?.tel}`}>
                        {jobOwner?.tel ? jobOwner?.tel : `${t('doenst_exist')}`}
                    </a></p>

                    <div className='flex flex-col items-start gap-1 mt-3 break-words w-full'>
                        <p className='text-xl'>{t('description')}:</p>
                        <p className='break-words w-full'>{job.description}</p>
                    </div>

                    <button onClick={handleShowDdetails} className='mt-3 flex items-center gap-1'>
                        {t('details')}:
                        {showDetails ? <IoArrowUpOutline /> : <IoArrowDownOutline />}
                    </button>
                    {showDetails && <div className='flex flex-col items-start gap-1'>
                        <p>{t('owner')}: {jobOwner?.name}</p>

                        <div className='flex flex-row items-start gap-5'>
                            <p>{t('skills')}: </p>
                            {job.neededSkils.length === 0 ? "No reqires" : <ul className='flex flex-col items-start gap-1'>
                                {job.neededSkils && job.neededSkils.map((item, index) => <li key={index}>
                                    {index + 1}. {item} {index === job.neededSkils.length - 1 ? '.' : job.neededSkils.length > 1 ? ',' : ''}
                                </li>)}
                            </ul>}
                        </div>
                    </div>}
                </div>
            )}

            {modal && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='absolute inset-0 bg-black opacity-50'></div>
                    <div ref={modalRef} className='relative bg-white p-1 rounded-lg shadow-lg z-10'>
                        <ChangeJobData setModal={setModal} />
                    </div>
                </div>
            )}

            {job.userRef == currentUser?._id && (
                <div className='w-full flex flex-row items-center justify-between mt-3 gap-3 p-1'>
                    <button onClick={() => setModal(true)} className='bg-green-700 w-1/2 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('change')}</button>
                    <button onClick={handleDelete} className='bg-red-700 w-1/2 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Delete')}</button>
                </div>
            )}

            <div className='w-full flex flex-row items-start justify-between mt-3 gap-3 p-1'>
                {job.userRef !== currentUser._id && <div className='flex flex-col items-start gap-2 w-1/2'>
                    <button onClick={() => setContact(prevState => !prevState)} className='bg-green-800 w-full h-16 text-white p-1 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        {t('contact_with_owner')}
                    </button>
                    {contact && <Contact />}
                </div>}

                {currentUser._id !== jobOwner?._id && <button onClick={handleSendData} className='w-1/2 h-16 bg-red-700 text-white p-1 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {t('respond')}
                </button>}
            </div>

            {job.userRef == currentUser._id && filteredUsers.length > 0 && <div className='flex flex-col gap-4 mt-3 p-1'>
                <button onClick={() => setClickedPeople(prevState => !prevState)} className='bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {t('watch_people_who_clicked')}
                </button>
                {clickedPeople && filteredUsers.map((user, index) => (
                    <Link className='w-full border p-1 flex flex-row items-center gap-2' to={`/user/${user._id}`} key={user._id}>
                        <div className='flex flex-row items-center gap-1'>
                            <p className='mr-2'>{index + 1}.</p>
                            <img className='w-14 object-cover' src={
                                user?.avatar === null ? unfacedAvatar
                                    : (user?.avatar.includes('https://lh3.googleusercontent.com') || user?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${user?.avatar}`
                                        : `${import.meta.env.VITE_HOST}/static/userAvatar/${user?.avatar}`}
                                alt="avatar" />
                        </div>
                        <div className=''>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                    </Link>
                ))}
            </div>}

            <div className='p-1'>
                <button onClick={() => navigate(-1)} className='my-3 w-full bg-[#2A4BA0] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{t('Back')}</button>
            </div>
        </div>
    )
}
