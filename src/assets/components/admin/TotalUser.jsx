import React, { useState, useEffect } from 'react';
import { countUser } from '../utils/ApiFunctions';
import { Typography, Card } from 'antd';

const { Title, Text } = Typography;

const TotalUser = () => {
    const [userCount, setUserCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const count = await countUser();
                setUserCount(count);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCount();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    return (
        <div className="user-count-container">
            <Title level={3} style={{ marginBottom: '20px', textAlign: 'center', color: '#1890ff' }}>
                Total Users
            </Title>
            <Card bordered={false} style={{ textAlign: 'center', width: '100%' }}>
                <Text style={{ fontSize: '50px', fontWeight: 'bold' }}>
                    {userCount}
                </Text>
            </Card>
            <style jsx>{`
                .user-count-container {
                    padding: 20px;
                    background-color: #f5f5f5;
                    width: 40%;
                    height: auto;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    text-align: center;
                   
                }

                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh; /* Full screen height for centering */
                }

                .loader {
                    border: 8px solid #f3f3f3; /* Light grey */
                    border-top: 8px solid #3498db; /* Blue */
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .error-message {
                    color: red;
                    text-align: center;
                    padding: 10px;
                    background-color: #ffe5e5;
                    border: 1px solid red;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default TotalUser;
