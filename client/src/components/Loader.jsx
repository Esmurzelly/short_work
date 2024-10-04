import React from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
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
    )
}
