import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import 'swiper/css';
import IntroductionLogo from '../assets/Introduction/Intoduction_icon.svg'
import IntroductionHome from '../assets/Introduction/home.svg'
import { FaArrowRightLong } from "react-icons/fa6";

export default function Introduction() {
    return (
        <div className='flex flex-col flex-1 absolute top-0 left-0 w-full text-white'>
            {/* <p>Introduction</p>
        <Link to={'/sign-in'}>Sign in</Link> */}
            <div className='w-full'>
                <Swiper navigation={true} modules={[Navigation]}>
                    <SwiperSlide>
                        <div className='min-h-screen p-4 w-full bg-white text-black flex flex-col justify-around items-center'>
                            <img src={IntroductionLogo} className='w-32' alt="IntroductionLogo" />

                            <div className='w-2/3 text-center'>
                                <p className='text-2xl break-words flex flex-row items-center gap-2 justify-center'>Any kind of jobs are delivered to your home <img className='w-7' src={IntroductionHome} alt="IntroductionHome" /></p>
                                <p className='text-xl break-words mt-5'>There's something for everyone to enjoy with short work</p>
                            </div>

                            <Link className='bg-[#2A4BA0] w-2/3 py-3 rounded-lg text-center text-white flex flex-row justify-center gap-5 items-center text-2xl' to={'/sign-in'}>
                                Get Started
                                <FaArrowRightLong className='w-4' />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='min-h-screen p-4 w-full bg-white text-black flex flex-col justify-around items-center'>
                            <div className='w-2/3 text-center'>
                                <p className='text-2xl break-words flex flex-row items-center gap-2 justify-center'>From postmen to gardern workers! Whatever you want <img className='w-7' src={IntroductionHome} alt="IntroductionHome" /></p>
                                <p className='text-xl break-words mt-5'>You can become employee or employer by just clicking</p>
                            </div>

                            <img src={IntroductionLogo} className='w-32' alt="IntroductionLogo" />

                            <Link className='bg-[#2A4BA0] w-2/3 py-3 rounded-lg text-center text-white flex flex-row justify-center gap-5 items-center text-2xl' to={'/sign-in'}>
                                Get Started
                                <FaArrowRightLong className='w-4' />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='min-h-screen p-4 w-full bg-white text-black flex flex-col justify-around items-center'>
                            <img src={IntroductionLogo} className='w-32' alt="IntroductionLogo" />

                            <div className='w-2/3 text-center'>
                                <p className='text-2xl break-words flex flex-row items-center gap-2 justify-center'>Find your own worker or job for a few minutes <img className='w-7' src={IntroductionHome} alt="IntroductionHome" /></p>
                                <p className='text-xl break-words mt-5'>App's possibilities are in your hands!</p>
                            </div>

                            <Link className='bg-[#2A4BA0] w-2/3 py-3 rounded-lg text-center text-white flex flex-row justify-center gap-5 items-center text-2xl' to={'/sign-in'}>
                                Get Started
                                <FaArrowRightLong className='w-4' />
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>


        </div>
    )
}
