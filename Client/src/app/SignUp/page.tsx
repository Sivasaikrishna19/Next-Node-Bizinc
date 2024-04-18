"use client"
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { BASE_URL } from '~/env';

const Signup = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await axios.post(BASE_URL + '/signup', values);
            message.success('Signup successful');
            console.log(response.data);
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
            </Form>
        </div>
    );
};

export default Signup;
