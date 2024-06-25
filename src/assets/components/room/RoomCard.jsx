import React from "react";
import { Card, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} xs={24} sm={12} md={8} lg={5} className="mb-4">
      <Link to={`/book-room/${room.id}`} className="room-link"> {/* Wrap the Card with Link */}
        <Card
          hoverable
          cover={
            <img
              alt="Room Photo"
              src={`data:image/png;base64, ${room.photo}`}
              className="room-image" // Class for styling
            />
          }
          className="room-card"
        >
          <span className="hotel-color">{room.roomTypeName.name}</span>
          
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
            <div className="room-address-container">
              <div className="room-address">{room.roomAddress}, {room.roomLocation}</div>
            </div>
          </div>
          
          <Card.Meta
            title={<span className="hotel-color"></span>}
            description={<div className="hotel-color">${room.roomPrice}/night</div>}
          />

          <div className="rating">
            {Array(5).fill(0).map((_, index) => (
              <FontAwesomeIcon 
                key={index} 
                icon={faStar} 
                className={index < room.rating ? "star-rated" : "star-unrated"}
              />
            ))}
          </div>
        </Card>
      </Link>
      <style jsx>{`
        .hotel-color {
          color: #000000;
          font-weight: bold;
          font-size: 1.25rem;
          text-decoration: none;
        }

        .room-link, .room-link:hover, .room-link:focus, .room-link:active {
          text-decoration: none;
        }

        .room-card {
          border: none;
          transition: transform 0.2s;
          text-decoration: none;
        }

        .room-card:hover {
          transform: translateY(-10px);
          text-decoration: none;
        }

        .btn-hotel {
          background-color: #ff5a5f;
          border: none;
          color: #fff;
          text-decoration: none;
        }
          
        .btn-hotel:hover {
          background-color: #ff6b6b;
          border: none;
          color: #fff;
          text-decoration: none;
        }

        .ant-card-cover img {
          max-width: 100%;
          max-height: 300px;
          object-fit: cover;
        }

        .star-rated {
          color: gold;
        }
        
        .star-unrated {
          color: #ccc;
        }
      `}</style>
    </Col>
  );
};

export default RoomCard;
