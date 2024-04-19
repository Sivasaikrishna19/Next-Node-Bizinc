'use client'
import React, { useEffect, useState } from 'react'
import Form from '~/components/Form/Form'
import Users from '~/components/UsersList/UsersList'
import axios from 'axios'
import { BASE_URL } from '~/env'
import NavBar from '~/components/NavBar/NavBar'
import { message } from 'antd'



const page = () => {
    const [users, setUsers] = useState<any>([])
    const handleAddUser = (userData: any) => {
        axios.post(BASE_URL + 'users', userData).then((res) => {
            message.success('User added successfully!');
            getUsers()
        }).catch((e: any) => {
            console.log(e)
        })
    }

    const getUsers = () => {
        axios
            .get(BASE_URL + "users")
            .then((res) => {
                console.log(res.data, "users");
                setUsers(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <><NavBar />
            <div className='w-full flex'>
                <div className='m-auto w-[70%] bg-[#e0e0e0] h-[100vh]'>
                    <div className='w-full flex justify-center'>
                        <div className='text-[32px] font-semibold'>Users</div>
                    </div>
                    <div className='w-full px-4'>

                        <Form onSubmit={handleAddUser} />

                        <Users users={users} setUsers={setUsers} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default page;
