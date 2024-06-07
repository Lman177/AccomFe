import React, { useState } from "react";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomLocationSelector from "./RoomLocationSelector";
import RoomCard from "../room/RoomCard";
import { DatePicker, Form, Button, Row, Col, Space, Spin, Pagination } from "antd";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Adjusted for larger RoomCard

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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedRooms = availableRooms.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item>
                <RoomTypeSelector
                  handleRoomInputChange={handleInputChange}
                  selectedRoomType={selectedRoomType}
                  setSelectedRoomType={setSelectedRoomType}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item>
                <RoomLocationSelector
                  handleRoomInputChange={handleInputChange}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </Form.Item>
            </Col>
            <Col >
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
            </Col>
          </Row>
        </Space>
      </Form>

      <div className="result-container">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            {availableRooms.length > 0 && (
              <>
                <Row  justify="center" style={{width:"100%", gap:"5px"}}>
                  {paginatedRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </Row>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={availableRooms.length}
                  onChange={handlePageChange}
                  style={{ marginTop: "20px" }}
                />
              </>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </>
        )}
      </div>

      <style jsx>{`
        .search-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          padding: 0 20px;
          
        }

        .search-form {
          width: 100%;
          max-width: 1200px;
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

        .result-container {
            max-width: 1150px; /* Increased max-width for larger container */
            margin-top: 20px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
           
           
        }

        .error-message {
          color: red;
          margin-top: 20px;
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
