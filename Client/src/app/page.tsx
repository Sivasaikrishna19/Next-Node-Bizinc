"use client"

import 'antd/dist/reset.css'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import Form from '~/components/Form/Form'
import Users from '~/components/Users/Users'



const page = () => {
  const [users, setUsers] = useState<any>([])

  const handleAddUser = (userData: any) => {
    const userId = Math.random().toString(36).substring(7);
    setUsers([...users, { ...userData, userId }])
  }

  return (
    <div className='w-full flex'>
      <div className='m-auto w-[70%] bg-[#e0e0e0] h-[100vh]'>
        <div className='w-full flex justify-center'>
          <div className='text-[32px] font-semibold'>Users</div>
        </div>
        <div className='w-full px-4'>

          <Form onSubmit={handleAddUser} />

          <Users users={users} />

        </div>
      </div>
    </div>
  )
}

export default page;
