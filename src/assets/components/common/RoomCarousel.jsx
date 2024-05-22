import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card, Row, Col, Spin, Alert, Button } from 'antd';
import { getAllRooms } from '../utils/ApiFunctions';
import RoomPaginator from './RoomPaginator';
import './RoomCarousel.css';

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
    <section className="room-carousel-section bg-light mb-5 shadow">
      <div className="container">
        <Link to="/browse-all-rooms" className="hotel-color text-center d-block mb-3">
          Browse all rooms
        </Link>
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
                            style={{ height: "200px", objectFit: "cover" }}
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
    </section>
  );
};

export default RoomCarousel;
