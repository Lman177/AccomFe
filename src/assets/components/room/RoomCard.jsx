import React from 'react'
import { Carousel, Card, Row, Col, Spin, Alert, Button } from 'antd';
import { Link } from 'react-router-dom'
import './RoomCard.css'
const RoomCard = ({room}) => {
  ////TODO: Add room information here
  return (
    <Col key={room.id} xs={24} sm={12} md={8} lg={6} className="mb-4">
                    <Card
                      hoverable
                      cover={
                        <Link to={`/book-room/${room.id}`}>
                          <img
                            alt="Room Photo"
                            src={`data:image/png;base64, ${room.photo}`}
                            className="room-image" // Add a class for styling
                          />
                        </Link>
                      }
                    >
                      <Card.Meta
                        title={<span className="hotel-color">{room.roomTypeName.name}</span>}
                        description={<div className="room-price">${room.roomPrice}/night</div>}
                      />
                      <Button type="primary" className="btn-hotel mt-2">
                        <Link to={`/book-room/${room.id}`}>Book Now</Link>
                      </Button>
                    </Card>
                  </Col>
  )
}

export default RoomCard

