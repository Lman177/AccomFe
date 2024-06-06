
import React from "react";
import { Card, Col, Button } from "antd";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
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
        className="room-card"
      >
        <Card.Meta
          title={<span className="hotel-color">{room.roomTypeName.name}</span>}
          description={<div className="room-price">${room.roomPrice}/night</div>}
        />
        <Card.Meta
          title={<span className="hotel-color">{room.roomLocation.name}</span>}
          description={<div className="room-price">{room.roomLocation}</div>}
        />
        <Button type="primary" className="btn-hotel mt-2">
          <Link to={`/book-room/${room.id}`}>Book Now</Link>
        </Button>
      </Card>
      <style jsx>{`
        .hotel-color {
          color: #000000;
          font-weight: bold;
          font-size: 1.25rem;
          text-decoration: none;
        }

        .hotel-color:hover {
          text-decoration: underline;
        }

        .room-card {
          border: none;
          transition: transform 0.2s;
        }

        .room-card:hover {
          transform: translateY(-10px);
        }

        .btn-hotel {
          background-color: #ff5a5f;
          border: none;
          color: #fff;
        }
          

        .btn-hotel:hover {
          background-color: #ff6b6b;
          border: none;
          color: #fff;
        }

        .ant-card-cover img {
          max-width: 100%;
          max-height: 300px;
          object-fit: cover;
        }
      `}</style>
    </Col>
  );
};

export default RoomCard;  