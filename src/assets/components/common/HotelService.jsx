import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const HotelService = () => {
  return (
    <>
      <div className="hotel-service">
        <Header title="Our Services" />
        <Container>
          <Row className="mt-4 text-center">
            <h4 className="text-center mb-4">
              Services at Accom
              <span className="service-icon">
                <FaClock className="ml-2" /> 24-Hour Front Desk
              </span>
            </h4>
          </Row>
          <Row xs={1} md={2} lg={3} className="g-4 mt-2">
            <Col>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="hotel-color">
                    <FaWifi /> WiFi
                  </Card.Title>
                  <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="hotel-color">
                    <FaUtensils /> Breakfast
                  </Card.Title>
                  <Card.Text>Start your day with a delicious breakfast buffet.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="hotel-color">
                    <FaTshirt /> Laundry
                  </Card.Title>
                  <Card.Text>Keep your clothes clean and fresh with our laundry service.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="hotel-color">
                    <FaCocktail /> Mini-bar
                  </Card.Title>
                  <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="hotel-color">
                    <FaParking /> Parking
                  </Card.Title>
                  <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="hotel-color">
                    <FaSnowflake /> Air conditioning
                  </Card.Title>
                  <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <style jsx>{`
        .hotel-service {
          margin-bottom: 2rem;
          padding: 2rem 0;
          background-color: #f8f9fa;
        }

        .hotel-service .service-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: 1rem;
          color: #6c757d;
        }

        .hotel-service .service-card {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .hotel-service .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .hotel-service .hotel-color {
          
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .hotel-service .hotel-color svg {
          margin-right: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default HotelService;
