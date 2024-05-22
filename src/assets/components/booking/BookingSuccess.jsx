import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../common/Header";
import { Result, Button } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <div className="container">
      <Header title="Booking Status" />
      <div className="mt-5">
        {message ? (
          <Result
            icon={<SmileOutlined />}
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Booking Success!</span>}
            subTitle={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{message}</span>}
            extra={<Button type="primary"><Link to="/">Next</Link></Button>}
          />
        ) : (
          <Result
            status="error"
            icon={<FrownOutlined />}
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Error Booking Room!</span>}
            subTitle={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{error}</span>}
            extra={<Button type="primary"><Link to="/">Retry</Link></Button>}
          />
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
