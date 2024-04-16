"use client"
import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';

const Profile: React.FC = () => {

    useEffect(() => {
        console.log('hit')
    }, [])

    return (
        <div className='w-full flex'>
            <div className='m-auto w-[70%] bg-[#e0e0e0] h-[100vh]'>
                <div className='w-full flex justify-center'>
                    <div className='text-[32px] font-semibold'>User Profile</div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
