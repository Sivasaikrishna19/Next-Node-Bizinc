"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '~/env';
import { Button, Drawer, Form, Input, message } from 'antd';


const Profile = () => {

    const userId = window.location.pathname.split('/').pop();
    const [user, setUser] = useState({ name: '', age: '', gender: '', occupation: '' });
    const [drawerVisible, setDrawerVisible] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await axios.get(BASE_URL + `users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const handleEditProfile = () => {
        setDrawerVisible(true);
    }

    const handleFormSubmit = async (values: any) => {
        try {
            await axios.put(BASE_URL + `users/${userId}`, values).then((res) => {
                message.success('User Profile Updated Successfully!')
                setDrawerVisible(false);
                fetchUser();
            });

        } catch (error) {
            message.error('Something went wrong!')
            console.log(error);
        }
    }
    const handleGoBack = () => {
        window.history.back();
    }

    return (
        <div className='w-full flex'>
            <div className='m-auto w-[70%] bg-[#e0e0e0] h-[100vh] p-10'>
                <Button onClick={handleGoBack}>Go Back</Button>
                <div className='w-full flex justify-center'>
                    <div className='text-[32px] font-semibold'>User Profile</div>
                </div>
                <div className='mt-10'>
                    <h2 className='text-2xl mb-4'>Profile Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Occupation:</strong> {user.occupation}</p>
                </div>
                <div className='w-full flex justify-center'>
                    <Button onClick={handleEditProfile}>Edit Profile</Button>
                </div>
            </div>
            <Drawer
                title="Edit Profile"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={400}
            >
                <Form
                    initialValues={user}
                    onFinish={handleFormSubmit}
                >
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="Age">
                        <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender">
                        <Input />
                    </Form.Item>
                    <Form.Item name="occupation" label="Occupation">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default Profile;
