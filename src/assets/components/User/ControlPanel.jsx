import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import UserList from '../User/UserList'; // Import the ListUser component
import UsersRoom from '../room/UsersRoom';
import ExistingBookingOfOwner from '../booking/ExistingBookingOfOwner';
import AdminRooms from '../admin/AdminRooms';
import UserRevenue from '../User/UserRevenue'

const { Header, Sider, Content } = Layout;

const ControlPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Room');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
  };

  return (
    <div className=""style={{ height: 'auto', width: 'auto' }}>
      
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical " />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['User']}
            onClick={handleMenuClick}
            items={[
              {
                key: 'Room',
                icon: <HomeOutlined />,
                label: 'Room',
              },
              {
                key: 'Booking',
                icon: <ReadOutlined />,
                label: 'Booking',
              },
                {
                    key: 'Static',
                    icon: <UploadOutlined />,
                    label: 'Static',
                },
            ]}
          />
        </Sider>
        <Layout>
          <Header 
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
        <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}></span>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {currentPage === 'Room' && <AdminRooms/>}
            {currentPage === 'Booking' && <ExistingBookingOfOwner/>}
            {currentPage === 'Static'  && <UserRevenue/>}

          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ControlPanel;
