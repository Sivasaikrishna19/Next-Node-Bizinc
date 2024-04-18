'use client'
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '~/env';
import Link from 'next/link';


const Signup = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await axios.post(BASE_URL + 'signup', values);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                message.success('Signup successful');
                console.log(response.data);
                router.push('/');
            } else {
                message.error('Signup successful, but no token received');
            }
            setLoading(false);
        } catch (error: any) {
            message.error('Failed to signup');
            setLoading(false);
            console.error('Signup failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='text-[24px] font-semibold mb-3'>Sign Up</div>
            <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="w-full max-w-xs"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<i className="far fa-envelope" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<i className="fas fa-lock" />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                        Sign Up
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className="text-center">
                        <p className="text-gray-500">Already a member? <a href="/Login" className="text-blue-600 hover:underline">Login</a></p>
                    </div>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Signup;
