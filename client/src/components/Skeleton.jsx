import React from 'react'
import ContentLoader from 'react-content-loader';

export default function Skeleton() {
    return (
        <ContentLoader width={1920} height={1080} className='w-full mt-10 h-screen flex items-center justify-center mx-auto' viewBox="0 0 1360 900">
            <rect x="150" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="150" y="290" rx="0" ry="0" width="200" height="18" />
            <rect x="150" y="250" rx="0" ry="0" width="120" height="20" />

            <rect x="450" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="450" y="290" rx="0" ry="0" width="200" height="18" />
            <rect x="450" y="250" rx="0" ry="0" width="120" height="20" />

            <rect x="750" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="750" y="290" rx="0" ry="0" width="200" height="18" />
            <rect x="750" y="250" rx="0" ry="0" width="120" height="20" />

            <rect x="1050" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="1050" y="290" rx="0" ry="0" width="200" height="18" />
            <rect x="1050" y="250" rx="0" ry="0" width="120" height="20" />


            <rect x="150" y="450" rx="8" ry="8" width="200" height="200" />
            <rect x="150" y="720" rx="0" ry="0" width="200" height="18" />
            <rect x="150" y="680" rx="0" ry="0" width="120" height="20" />

            <rect x="450" y="450" rx="8" ry="8" width="200" height="200" />
            <rect x="450" y="720" rx="0" ry="0" width="200" height="18" />
            <rect x="450" y="680" rx="0" ry="0" width="120" height="20" />

            <rect x="750" y="450" rx="8" ry="8" width="200" height="200" />
            <rect x="750" y="720" rx="0" ry="0" width="200" height="18" />
            <rect x="750" y="680" rx="0" ry="0" width="120" height="20" />

            <rect x="1050" y="450" rx="8" ry="8" width="200" height="200" />
            <rect x="1050" y="720" rx="0" ry="0" width="200" height="18" />
            <rect x="1050" y="680" rx="0" ry="0" width="120" height="20" />
        </ContentLoader>
    )
}
