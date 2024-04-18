'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/Users');
    }
  }, [router]);

  return (
    <div className='w-full flex justify-center items-center h-screen'>
      <div className='text-[32px] font-semibold'>Redirecting...</div>
    </div>
  );
}

export default Page;
