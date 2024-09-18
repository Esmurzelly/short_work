import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLoginUser } from '../store/user/authSlice';
import { useDispatch } from 'react-redux';
import { app } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            dispatch(googleLoginUser({ name: result.user.displayName, email: result.user.email, role: "user", avatar: result.user.photoURL }))
            // console.log('google click result', result);

            // const res = await fetch('/api/auth/google', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: result.user.displayName,
            //         email: result.user.email,
            //         role: "user",
            //         avatar: result.user.photoURL,
            //     })
            // });

            // const data = await res.json();
            // console.log('google oath', data);
            // dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
    )
}
