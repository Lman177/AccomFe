import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button, Modal, Space } from 'antd';
import { getAllUser, deleteUser } from '../utils/ApiFunctions';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(response);
      } catch (error) {
        setError(`Error fetching users: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (userEmail) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await deleteUser(userEmail);
        setUsers(users.filter(user => user.email !== userEmail));
      } catch (error) {
        setError(`Error deleting user: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => roles.map(role => role.name).join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <Space size="middle">
          <Button onClick={() => handleViewDetails(user)}>
            <FaEye />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(user.email)}>
            <FaTrashAlt />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {loading && <Spin tip="Loading..." />}
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      <Table dataSource={users} columns={columns} rowKey="id" />
      <Modal
        title="User Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Roles:</strong> {selectedUser.roles.map(role => role.name).join(', ')}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserList;
