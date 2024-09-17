import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className='text-center'>
            {currentUser && (
                <>
                    <h1>{currentUser?.name}</h1>
                    <h1>{currentUser?.role}</h1>
                </>
            )}

        </div>
    )
}
