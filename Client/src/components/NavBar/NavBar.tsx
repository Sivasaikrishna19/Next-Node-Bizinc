'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct the import

const NavBar = () => {
    const [token, setToken] = useState<boolean>(false); // Assume not logged in initially
    const router = useRouter();

    useEffect(() => {
        // Create a function to update the token state
        const updateToken = () => {
            const token = localStorage.getItem('token');
            setToken(!!token); // Convert to boolean, true if token exists, false otherwise
        };

        updateToken(); // Call when component mounts

        // Optional: Listen for custom events if needed for other parts of the app to communicate
        window.addEventListener('storage', updateToken); // Listen for changes in storage

        return () => {
            window.removeEventListener('storage', updateToken); // Clean up listener
        };
    }, []); // Empty array means this effect only runs once after the initial render

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(false); // Update state to reflect logged out status
        router.push('/Login'); // Redirect to login page
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
