import 'antd/dist/reset.css'

import { Button, Input } from 'antd'
import React from 'react'



const page = () => {
  return (
    <div className='w-full flex'>
      <div className='m-auto w-[70%] bg-[#e0e0e0] h-[100vh]'>
        <div className='w-full flex justify-center'>
          <div className='text-[32px] font-semibold'>Users</div>
        </div>
        <div>

          <Button type="primary">Primary Button</Button>
        </div>
      </div>
    </div>
  )
}

export default page
