import React from 'react'
import BookingStats from './BookingStats '
import RevenueChart from './RevenueChart '
import { Col, Row } from 'antd'
import TotalUser from './TotalUser'
import Revenue from './Revenue'
import TotalRoom from './TotalRoom'

const Statics = () => {
    return (
      <div >
        <Row>
          <Col>
          <div style={{ width: '250%'}}>
              <TotalRoom />
            </div>
            <div style={{ width: '250%', marginTop:'20px'}}>
              <TotalUser/>
            </div>
          </Col>
          <Col >
            <div style={{ width: '100%' }}>
              <RevenueChart />
            </div>
          </Col>
          <Col>
          <div style={{ width: '250%',marginLeft:'20px'}}>
              <BookingStats />
            </div>
          <div  style={{ width: '250%',marginLeft:'20px', marginTop:'20px' }}>
            <Revenue/>
          </div>

          </Col>
        </Row>
      </div>
    );
  }
  export default Statics;