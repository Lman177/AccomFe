import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../common/Header";
import { Result, Button } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: 600px;
  width: 100%;
  margin-top: 80px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 150px;
  font-size: 16px;
`;

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message; 
  const error = location.state?.error;

  return (
    <Container>
      <Header title="Booking Status" />
      <Content>
        {message ? (
          <Result
          status="success"
            icon={<SmileOutlined style={{ color: '#52c41a' }} />}
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Booking Success!</span>}
            subTitle={<span style={{ fontSize: '18px' }}>{message}</span>}
            extra={<StyledButton type="primary"><Link to="/">Next</Link></StyledButton>}
          />
        ) : (
          <Result
            status="error"
            icon={<FrownOutlined style={{ color: '#ff4d4f' }} />}
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Error Booking Room!</span>}
            subTitle={<span style={{ fontSize: '18px' }}>{error}</span>}
            extra={<StyledButton type="primary"><Link to="/">Retry</Link></StyledButton>}
          />
        )}
      </Content>
    </Container>
  );
};

export default BookingSuccess;
