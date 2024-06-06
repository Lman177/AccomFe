import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomLocationSelector from "./RoomLocationSelector";
import { DatePicker, Form, Button, Row, Col, Space, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    roomLocation: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = () => {
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
      selectedLocation
    )
      .then((response) => {
        setAvailableRooms(response.data);
        setIsLoading(false);
        if (response.data.length === 0) {
          setErrorMessage("No rooms available for the selected dates and options.");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("An error occurred while fetching available rooms.");
        setIsLoading(false);
      });
  };

  const handleDateChange = (name, date) => {
    setSearchQuery({ ...searchQuery, [name]: date ? date.format("YYYY-MM-DD") : "" });
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    setErrorMessage("");
  };

  // Function to handle changes in room type and save to localStorage
  const handleRoomTypeChange = (value) => {
    setSelectedRoomType(value);
  };

  // Function to handle changes in location and save to localStorage
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
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
    <div className="search-container">
      <Form onFinish={handleSearch} className="search-form">
        <Space size="large">
        <Row gutter={[16, 16]} justify="center" align="middle">
        <Col xs={24} sm={12} md={6} lg={5}>
          <Form.Item>
            <DatePicker
              placeholder="Add dates"
              name="checkInDate"
              value={searchQuery.checkInDate ? moment(searchQuery.checkInDate) : null}
              onChange={(date) => handleDateChange("checkInDate", date)}
              format="YYYY-MM-DD"
              style={{ width: "100%"}}
            />
          </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
          <Form.Item>
            <DatePicker
              placeholder="Add dates"
              name="checkOutDate"
              value={searchQuery.checkOutDate ? moment(searchQuery.checkOutDate) : null}
              onChange={(date) => handleDateChange("checkOutDate", date)}
              format="YYYY-MM-DD"
              style={{ width: "100%"}}
            />
          </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
          <Form.Item>
            <RoomTypeSelector
              className="room-type-selector"
              selectedRoomType={selectedRoomType}
              setSelectedRoomType={handleRoomTypeChange}
              style={{ width: "100%", height: "50px" }}
            />
          </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
          <Form.Item>
            <RoomLocationSelector
              className="room-location-selector"
              selectedLocation={selectedLocation}
              setSelectedLocation={handleLocationChange}
              style={{ width: "100%", height: "50px" }}
            />
          </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={4}>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />

          </Col>
          </Row>
        </Space>
      </Form>
      {isLoading ? (
        <div className="text-center mt-4">
          <Spin tip="Finding available rooms..." size="large" />
        </div>
      ) : availableRooms.length > 0 ? (
        <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
      ) : (
        errorMessage && <div className="mt-4">{errorMessage}</div>
      )}
     <style jsx>{`
        .search-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* Center horizontally */
          margin-top: 30px;
          padding: 0 20px;
        }

        .search-form {
          width: 100%;
          max-width: 1200px; /* Limit the max width */
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .ant-btn-primary {
          margin-bottom: 25px;
          background-color: #ff385c;
          border-color: #ff385c;
        }

        .ant-btn-primary:hover {
          background-color: #ff5a70;
          border-color: #ff5a70;
        }

        .ant-btn-primary .anticon {
          font-size: 18px;
        }

        @media (max-width: 576px) {
          .search-form {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default RoomSearch;