import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserOfRoomById } from '../utils/ApiFunctions';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const User = ({ roomId }) => {
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await getUserOfRoomById(roomId);
        setOwnerInfo(response);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchOwnerInfo();
  }, [roomId]);

  if (isLoading) return <p>Loading owner information...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="owner-info mt-5">
      <h4>Host Information</h4>
      <div className="owner-details">
        <Avatar 
          size={80} 
          src={`/mnt/data/image.png`} 
          icon={<UserOutlined />} 
          className="avatar"
        />
        <div className="info">
          <p><strong>Name:</strong> {ownerInfo.firstName}</p>
          <p><strong>Phone Number:</strong> {ownerInfo.phoneNumber}</p>
          <p><strong>Email:</strong> {ownerInfo.email}</p>
          <p><strong>Host Since:</strong> {new Date(ownerInfo.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <style jsx>{`
        .owner-info {
        
          width: 80%;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          margin bottom: 50px;
        }

        .owner-details {
          display: flex;
          align-items: center;
        }

        .avatar {
          margin-right: 20px;
        }

        .info p {
          margin: 0;
        }
        
        .info p + p {
          margin-top: 8px;
        }

        h4 {
          margin-bottom: 20px;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
};

export default User;
