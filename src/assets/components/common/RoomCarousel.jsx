import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card, Row, Col, Spin, Alert, Button } from 'antd';
import { getAllRooms } from '../utils/ApiFunctions';
import RoomPaginator from './RoomPaginator';

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const roomsPerPage = 4;

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const data = await getAllRooms(currentPage, roomsPerPage);
        setRooms(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

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
      <h2 className="heading">All Rooms</h2>
      <div className="container">
        <Carousel dotPosition="bottom" autoplay>
          {[...Array(Math.ceil(rooms.length / roomsPerPage))].map((_, index) => (
            <div key={index}>
              <Row gutter={16}>
                {rooms.slice(index * roomsPerPage, (index + 1) * roomsPerPage).map((room) => (
                  <Col key={room.id} xs={24} sm={12} md={8} lg={6} className="mb-4">
                    <Card
                      hoverable
                      cover={
                        <Link to={`/book-room/${room.id}`}>
                          <img
                            alt="Room Photo"
                            src={`data:image/png;base64, ${room.photo}`}
                            className="room-image"
                          />
                        </Link>
                      }
                    >
                      {<span className="hotel-color">{room.roomTypeName.name}</span>}
                      
                      <div style={{ display: 'flex',
                        alignItems: 'center',
                        fontSize: '16px'

                      }} className=''>
                        <div className="room-address">{room.roomAddress}, {room.roomLocation} </div>
                      </div>
                      
                      <Card.Meta
                        title={<span className="hotel-color"></span>}
                        description={<div className="hotel-color">${room.roomPrice}/night</div>}
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
          currentPage={currentPage + 1}
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
          font-size: 10px;
          font-weight: bold;
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
