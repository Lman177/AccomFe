import React from 'react'
import BookingStats from './BookingStats '
import RevenueChart from './RevenueChart '
import { Col, Row } from 'antd'

const Statics = () => {
    return (
      <div >
        <Row>
          <Col>
            <div style={{ width: '250%'}}>
              <BookingStats />
            </div>
          </Col>
          <Col >
            <div style={{ width: '100%' }}>
              <RevenueChart />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  export default Statics;