import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card, Row, Col, Spin, Alert, Button } from 'antd';
import { getAllRooms } from '../utils/ApiFunctions';
import RoomPaginator from './RoomPaginator';

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([{ id: "", roomTypeName: "", roomPrice: "", photo: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 4; // Number of rooms per page

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin tip="Loading rooms..." size="large" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <Alert message={`Error: ${errorMessage}`} type="error" className="mt-5" />
    );
  }

  return (
    <section className="room-carousel-section bg-light mb-5 mt-2 shadow">
      <h2 className='heading '>All Room</h2>
      <div className="container">
        <Carousel dotPosition="bottom" autoplay>
          {[...Array(Math.ceil(currentRooms.length / roomsPerPage))].map((_, index) => (
            <div key={index}>
              <Row gutter={16}>
                {currentRooms.slice(index * roomsPerPage, index * roomsPerPage + roomsPerPage).map((room) => (
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
                      <Card.Meta
                        title={<span className="hotel-color">{room.roomLocation}</span>}
                        description={<div className="room-price">{room.Location}</div>}
                      />
                      <Button type="primary" className="btn-hotel mt-2">
                        <Link to={`/book-room/${room.id}`}>Book Now</Link>
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
        <RoomPaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <style jsx>{`
      .heading {
        text-align: center;
        margin-bottom: 2rem;
      }
.room-carousel-section {
    background-color: #f8f9fa;
    padding: 2rem 0;
    border-radius: 8px;
  }
  
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
  
  .room-price {
    font-size: 1.1rem;
    color: #333;
  }
  
  .btn-hotel {
    background-color: #ff5a5f;
    border: none;
    color: #fff;
  }
  
  .btn-hotel:hover {
    background-color: #fff;
    color: #fff;
  }
  
  .loading-container {
    text-align: center;
    margin-top: 5rem;
  }
  
  .loading-container p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
  
  .room-carousel-section .ant-card-cover img {
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
  }
  

.room-carousel-section {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .room-card {
    border-radius: 15px;
    overflow: hidden;
    position: relative;
  }
  
  .room-image {
    height: 200px;
    object-fit: cover;
  }
  
  .card-meta {
    padding: 16px;
  }
  
  .room-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .room-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  
  .room-distance,
  .room-date,
  .room-price {
    display: block;
  }
  
  .guest-favorite {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(255, 255, 255, 0.8);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .rating {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.8);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .star {
    color: gold;
  }
   `}</style>
    </section>
  );
};

export default RoomCarousel;
