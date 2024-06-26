import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdateUserForm = () => {
    const [loading, setLoading] = useState(false);
    const userEmail = localStorage.getItem("userEmail");

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/users/update`, null, {
                params: {
                    userEmail,
                    ...values
                }
            });
            message.success(response.data);
        } catch (error) {
            message.error(`Error updating user: ${error.response.data}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update User Profile</h2>
            <Form layout="vertical" onFinish={handleUpdate}>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                    <Input type="tel" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUserForm;
