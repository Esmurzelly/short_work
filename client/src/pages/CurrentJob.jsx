import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletejob, getAllJobs, getJobById } from '../store/user/jobSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ChangeJobData from '../components/ChangeJobData';
import { findUserByUserRefJob } from '../store/user/authSlice';
import Contact from '../components/Contact';
import { Triangle } from 'react-loader-spinner'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import 'swiper/css';


export default function CurrentJob() {
    const { job, loading } = useSelector(state => state.job);
    const { currentUser, jobOwner } = useSelector(state => state.user);
    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    console.log('cur job', job);

    useEffect(() => {
        dispatch(getJobById(params));
        dispatch(findUserByUserRefJob(params.id))
    }, [params.id]);

    if (!job || loading || !jobOwner) {
        return <div className='w-full min-h-screen flex items-center justify-center'>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    const handleDelete = () => {
        try {
            dispatch(deletejob({ id: job._id }));
            dispatch(getAllJobs());
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-1 flex-col'>
            {job && (
                <div>
                    <h1>Current Item</h1>
                    <p>title {job.title}</p>
                    <p>description {job.description}</p>
                    <p>address {job.address}</p>
                    <p>salary: {job.salary}</p>
                    {job.imageUrls && <p>avatar: <img className='w-32 h-32' src={`http://localhost:3000/static/jobAvatar/${job?.imageUrls[0]}` || "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70"} alt="imgUrl" /></p>}
                    <p>Owener: {jobOwner?.name}</p>
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
                    <button onClick={() => setModal(true)} className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Change</button>
                    <button onClick={handleDelete} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Delete</button>
                </div>
            )}

            <button onClick={() => setContact(true)} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                Contact with owner
            </button>
            {contact && <Contact />}

            <button onClick={() => navigate(-1)} className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Back</button>

            {job && job?.imageUrls && (
                <div>
                    <Swiper navigation={true} modules={[Navigation]}>
                        {job.imageUrls.map((item) => (
                            <SwiperSlide key={item}>
                            <div
                                className='h-[550px] w-full'
                                style={{
                                    background: `url(http://localhost:3000/static/jobAvatar/${item}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                // <Swiper navigation={true} modules={[Navigation]}>
                //     {job.imageUrls.map((item) => (
                //         <div className='w-full'>
                //             <SwiperSlide key={item}>Slide 1</SwiperSlide>
                //         </div>
                //     ))}
                // </Swiper>
            )}
        </div>
    )
}
