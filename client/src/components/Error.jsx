import React from 'react'
import { Comment } from 'react-loader-spinner'

export default function Error() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </div>
    )
}
