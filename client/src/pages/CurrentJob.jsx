import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletejob, getAllJobs, getJobById } from '../store/user/jobSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ChangeJobData from '../components/ChangeJobData';


export default function CurrentJob() {
    const { job, loading } = useSelector(state => state.job);
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    console.log('cur job', job)

    useEffect(() => {
        dispatch(getJobById(params));
    }, [params.id]);

    if (!job || loading) return <p>Loading....</p>

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
                    {job.imageUrls && <p>avatar: <img className='w-32 h-32' src={job?.imageUrls[0] || "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70"} alt="imgUrl" /></p>}
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

            <button onClick={() => setModal(true)} className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Change</button>
            <button onClick={handleDelete} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Delete</button>
        </div>
    )
}
