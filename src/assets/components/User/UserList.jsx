import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button, Modal } from 'antd';
import { getAllUser, deleteUser } from '../utils/ApiFunctions';
import { FaEdit, FaEye, FaPlus} from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

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

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
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
        <>
          <Button type="link" onClick={() => handleViewDetails(user)}>
          <FaEye />
          </Button>
          <Button type="link" danger onClick={() => handleDelete(user.id)}>
          <FaTrashAlt />
          </Button>
        </>
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
            <p>ID: {selectedUser.id}</p>
            <p>First Name: {selectedUser.firstName}</p>
            <p>Last Name: {selectedUser.lastName}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Roles: {selectedUser.roles.map(role => role.name).join(', ')}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserList;
