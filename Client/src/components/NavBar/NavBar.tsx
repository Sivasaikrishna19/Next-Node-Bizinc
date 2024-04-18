'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const [token, setToken] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {

        const updateToken = () => {
            const token = localStorage.getItem('token');
            setToken(!!token);
        };

        updateToken();


        window.addEventListener('storage', updateToken);

        return () => {
            window.removeEventListener('storage', updateToken);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(false);
        router.push('/Login');
    };

    return (
        <div className='p-4 bg-[#001f3f] px-16'>
            <div className='flex justify-between items-center'>
                <div className='text-white text-[24px] font-semibold'>
                    User Management System
                </div>
                {token && (
                    <div className='text-white font-semibold cursor-pointer' onClick={handleLogout}>
                        Log out
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
