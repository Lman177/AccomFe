import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomLocationSelector from "./RoomLocationSelector";
import './RoomSearch.css';

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomTypeName: "",
    roomLocation: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkInMoment = moment(searchQuery.checkInDate);
    const checkOutMoment = moment(searchQuery.checkOutDate);

    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
        setErrorMessage("Please enter valid dates");
        return;
    }

    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
        setErrorMessage("Check-out date must be after check-in date");
        return;
    }

    setIsLoading(true);
    getAvailableRooms(
        searchQuery.checkInDate,
        searchQuery.checkOutDate,
        selectedRoomType,
        selectedLocation,
    )
    .then((response) => {
        setAvailableRooms(response.data);
        setTimeout(() => setIsLoading(false), 2000);
    })
    .catch((error) => {
        console.error("Error fetching available rooms:", error);
        setErrorMessage("An error occurred while fetching available rooms.");
        setIsLoading(false);
    });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    setErrorMessage("");
  };

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomTypeName: "",
      roomLocation: ""
    });
    setAvailableRooms([]);
    setErrorMessage("");
  };

  return (
    <Container className="shadow mt-n5 mb-5 py-5 room-search-container">
      <Form onSubmit={handleSearch}>
        <Row className="justify-content-center">
          <Col xs={12} md={3}>
            <Form.Group controlId="checkInDate">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={searchQuery.checkInDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group controlId="checkOutDate">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={searchQuery.checkOutDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group controlId="roomTypeName">
              <Form.Label>Room Type</Form.Label>
              <div>
              <RoomTypeSelector
                  handleRoomInputChange={handleInputChange}
                  selectedRoomType={selectedRoomType}
                  setSelectedRoomType={setSelectedRoomType}
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group controlId="roomLocation">
              <Form.Label>Room Location</Form.Label>
              <RoomLocationSelector
                  handleRoomInputChange={handleInputChange}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 ">
          <Button variant="primary" type="submit">
            Search
          </Button>
          
        </Row>
      </Form>
      {isLoading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p>Finding available rooms...</p>
        </div>
      ) : availableRooms.length > 0 ? (
        <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
      ) : (
        <p ></p>
      )}
      {errorMessage && <p className="text-danger text-center mt-4">{errorMessage}</p>}
    </Container>
  );
};

export default RoomSearch;
