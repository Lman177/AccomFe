import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Container, Row, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllRooms } from '../utils/ApiFunctions';
import './RoomCarousel.css';

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([{ id: "", roomTypeName: "", roomPrice: "", photo: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading rooms...</p>
      </div>
    );
  }
  
  if (errorMessage) {
    return (
      <Alert variant="danger" className="mt-5">
        Error: {errorMessage}
      </Alert>
    );
  }

  return (
    <section className="room-carousel-section bg-light mb-5  shadow">
      <Container>
        <Link to="/browse-all-rooms" className="hotel-color text-center d-block mb-3">
          Browse all rooms
        </Link>
        <Carousel indicators={false} interval={null}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card className="room-card h-100">
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="hotel-color">{room.roomTypeName.name}</Card.Title>
                        <Card.Text className="room-price">${room.roomPrice}/night</Card.Text>
                        <Link to={`/book-room/${room.id}`} className="btn btn-hotel mt-auto">
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
