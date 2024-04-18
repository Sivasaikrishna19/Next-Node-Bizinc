"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '~/env';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, [router]);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await axios.post(BASE_URL + 'login', values);
            localStorage.setItem('token', response.data.token);
            message.success('Login successful');
            setLoading(false);
            router.push('/');
        } catch (error: any) {
            message.error('Failed to login');
            setLoading(false);
            console.error('Login failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='text-[24px] font-semibold mb-3'>Login</div>
            <Form
                name="login"
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
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className="text-center">
                        <p className="text-gray-500">Not a member? <a href="/SignUp" className="text-blue-600 hover:underline">Sign up now</a></p>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
