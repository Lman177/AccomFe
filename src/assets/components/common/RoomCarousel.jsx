import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Alert, Button, Pagination, Spin } from 'antd';
import { getAllRooms } from '../utils/ApiFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const roomsPerPage = 4;
  const cache = useRef({});

  useEffect(() => {
    const fetchRooms = async (page) => {
      setIsLoading(true);
      try {
        if (cache.current[page]) {
          setRooms(cache.current[page].content);
          setTotalPages(cache.current[page].totalPages);
        } else {
          const data = await getAllRooms(page, roomsPerPage);
          setRooms(data.content);
          setTotalPages(data.totalPages);
          cache.current[page] = data;
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    const prefetchNextPage = async () => {
      const nextPage = currentPage;
      if (!cache.current[nextPage]) {
        try {
          const data = await getAllRooms(nextPage, roomsPerPage);
          cache.current[nextPage] = data;
        } catch (error) {
          console.error("Error prefetching data: ", error);
        }
      }
    };

    prefetchNextPage();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (errorMessage) {
    return (
      <Alert message={`Error: ${errorMessage}`} type="error" className="mt-5" />
    );
  }

  return (
    <section className={`room-carousel-section bg-light mb-5 mt-2 shadow ${isLoading ? 'loading' : ''}`}>
      <h2 className="heading">All Rooms</h2>
      <div className="container">
        {isLoading && (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        )}
        {!isLoading && (
          <>
            <Row gutter={16}>
              {rooms.map((room) => (
                <Col key={room.id} xs={24} sm={12} md={8} lg={6} className="mb-4">
                  <Link to={`/book-room/${room.id}`} className="room-link">
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
                    <span className="hotel-color">{room.roomTypeName.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', width: "100%" }}>
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
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              total={totalPages * roomsPerPage}
              pageSize={roomsPerPage}
              onChange={handlePageChange}
              className="pagination"
            />
          </>
        )}
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
          transition: opacity 0.5s ease-in-out;
        }
        .room-carousel-section.loading {
          opacity: 0.5;
        }
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
        }
        .room-card:hover {
          transform: translateY(-10px);
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
          text-decoration: none;
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
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
        }
        .star-rated {
          color: gold;
        }
        .star-unrated {
          color: #ccc;
        }
        .room-address-container {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        .room-address {
          display: inline-block;
          animation: slide 11.5s linear infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(-100%);
          }
          50.01% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px; /* Adjust height as needed */
        }
      `}</style>
    </section>
  );
};

export default RoomCarousel;
