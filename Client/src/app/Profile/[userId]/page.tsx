'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '~/env';
import { Button, Drawer, Form, Input, message } from 'antd';
import NavBar from '~/components/NavBar/NavBar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Profile = () => {
    const router = usePathname();
    const parts = router.split('/');
    const userId = parts[2];
    const [user, setUser] = useState({ name: '', age: '', gender: '', occupation: '' });
    const [drawerVisible, setDrawerVisible] = useState(false);

    const fetchUser = async () => {
        if (!userId) return;
        try {
            const res = await axios.get(BASE_URL + `users/${userId}`);
            setUser(res.data);
        } catch (error) {
            console.error(error);
            message.error('Failed to fetch user details.');
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const handleEditProfile = () => {
        setDrawerVisible(true);
    };

    const handleFormSubmit = async (values: any) => {
        try {
            await axios.put(BASE_URL + `users/${userId}`, values);
            message.success('User Profile Updated Successfully!');
            setDrawerVisible(false);
            fetchUser();
        } catch (error) {
            message.error('Something went wrong!');
            console.error(error);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <NavBar />
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
                    <Button onClick={handleEditProfile}>Edit Profile</Button>
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
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form>
                </Drawer>
            </div>
        </>
    );
};

export default Profile;
