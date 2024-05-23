import React, { useState } from "react";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomLocationSelector from "./RoomLocationSelector";
import { DatePicker, Form, Button, Row, Col, Input, Space, Spin } from "antd";
// import "antd/dist/antd.min.css";
import "./RoomSearch.css";
import { SearchOutlined } from "@ant-design/icons";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomTypeName: "",
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
    <div className="search-container">
      <Form onFinish={handleSearch} className="search-form">
        <Space size="large">
          
          <Form.Item>
            <DatePicker
              placeholder="Add dates"
              name="checkInDate"
              value={searchQuery.checkInDate ? moment(searchQuery.checkInDate) : null}
              onChange={(date) => handleDateChange("checkInDate", date)}
              format="YYYY-MM-DD"
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              placeholder="Add dates"
              name="checkOutDate"
              value={searchQuery.checkOutDate ? moment(searchQuery.checkOutDate) : null}
              onChange={(date) => handleDateChange("checkOutDate", date)}
              format="YYYY-MM-DD"
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item>
            <RoomTypeSelector
              handleRoomInputChange={handleInputChange}
              selectedRoomType={selectedRoomType}
              setSelectedRoomType={setSelectedRoomType}
            />
            
          </Form.Item>
          <Form.Item>
            
            <RoomLocationSelector
              handleRoomInputChange={handleInputChange}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
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
    </div>
  );
};

export default RoomSearch;
