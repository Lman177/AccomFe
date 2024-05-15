import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomLocationSelector from "./RoomLocationSelector";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomTypeName: "",
    roomLocation: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
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
        searchQuery.roomType,
		searchQuery.roomLocation,
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
      roomType: "",
      roomLocation: ""
    });
    setAvailableRooms([]);
    setErrorMessage("");
  };

  return (
    <Container className="shadow mt-n5 mb-5 py-5">
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
              <RoomTypeSelector
                handleRoomInputChange={handleInputChange}
                newRoom={searchQuery}
              />
            </Form.Group>
          </Col>
		  <Col xs={12} md={3}>
            <Form.Group controlId="roomLocation">
              <Form.Label>Room Location</Form.Label>
              <RoomLocationSelector
                handleRoomInputChange={handleInputChange}
                newRoom={searchQuery}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </Row>
      </Form>
      {isLoading ? (
        <p className="mt-4">Finding available rooms...</p>
      ) : availableRooms.length > 0 ? (
        <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
      ) : (
        <p className="mt-4">No rooms available for the selected dates and room type.</p>
      )}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Container>
  );
};

export default RoomSearch;
