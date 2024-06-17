import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomLocationSelector from "./RoomLocationSelector";
import RoomCard from "../room/RoomCard";
import { DatePicker, Form, Button, Row, Col, Space, Pagination, Slider, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomTypeName: "",
    roomLocation: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalRooms, setTotalRooms] = useState(0);
  const [prefetchedRooms, setPrefetchedRooms] = useState({});

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const fetchRooms = useCallback(
    debounce((page, query = searchQuery) => {
      setIsLoading(true);

      getAvailableRooms(
        query.checkInDate,
        query.checkOutDate,
        selectedRoomType,
        selectedLocation,
        query.minPrice,
        query.maxPrice,
        page,
        pageSize
      )
        .then((response) => {
          if (response.data && Array.isArray(response.data.content)) {
            setAvailableRooms(response.data.content);
            setTotalRooms(response.data.totalElements);
            setPrefetchedRooms((prev) => ({
              ...prev,
              [page]: response.data.content,
            }));
          } else {
            setAvailableRooms([]);
            setErrorMessage("Unexpected response format");
          }
          setIsLoading(false);
          if (response.data.content.length === 0) {
            setErrorMessage("No rooms available for the selected dates and options.");
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 300),
    [searchQuery, selectedRoomType, selectedLocation, pageSize]
  );

  useEffect(() => {
    if (!prefetchedRooms[currentPage - 1]) {
      fetchRooms(currentPage - 1);
    }
  }, [currentPage, fetchRooms, prefetchedRooms]);

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

    setCurrentPage(1);
    fetchRooms(0);
  };

  const handleDateChange = (name, date) => {
    setSearchQuery({ ...searchQuery, [name]: date ? date.format("YYYY-MM-DD") : "" });
    setErrorMessage("");
  };

  const handleRangeChange = (value) => {
    setSearchQuery({ ...searchQuery, minPrice: value[0], maxPrice: value[1] });
    setErrorMessage("");
  };

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomTypeName: "",
      roomLocation: "",
      minPrice: 0,
      maxPrice: 1000,
    });
    setAvailableRooms([]);
    setErrorMessage("");
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page, pageSize) => {
    setIsLoading(true);
    setCurrentPage(page);
    setPageSize(pageSize);
    if (prefetchedRooms[page - 1]) {
      setAvailableRooms(prefetchedRooms[page - 1]);
      setIsLoading(false);
    } else {
      fetchRooms(page - 1); // Adjust for zero-based index
    }
  };

  return (
    <div className="search-container">
      <Form onFinish={handleSearch} className="search-form">
        <Space size="large">
          <Row gutter={[16, 16]} justify="center" align="middle">
            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item>
                <DatePicker
                  placeholder="Check-in"
                  name="checkInDate"
                  disabledDate={disabledDate}
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
                  placeholder="Check-out"
                  name="checkOutDate"
                  disabledDate={disabledDate}
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
                  handleRoomInputChange={handleRangeChange}
                  selectedRoomType={selectedRoomType}
                  setSelectedRoomType={setSelectedRoomType}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item>
                <RoomLocationSelector
                  handleRoomInputChange={handleRangeChange}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Form.Item label="Price Range">
                <Slider
                  range
                  min={0}
                  max={1000}
                  defaultValue={[searchQuery.minPrice, searchQuery.maxPrice]}
                  onChange={handleRangeChange}
                  tooltipVisible
                />
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
            </Col>
          </Row>
        </Space>
      </Form>

      <div className="result-container">
        {isLoading && <Spin size="large" />}
        {!isLoading && availableRooms.length > 0 && (
          <>
            <Row justify="center" style={{ width: "100%", gap: "5px" }}>
              {availableRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </Row>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalRooms}
              onChange={handlePageChange}
              style={{ marginTop: "20px" }}
            />
            <Col>
              <Button className="mt-3" type="default" onClick={handleClearSearch}>
                Clear
              </Button>
            </Col>
          </>
        )}
        {!isLoading && errorMessage && <div className="error-message">{errorMessage}</div>}
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
          max-width: 1150px;
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .result-container > .ant-spin {
          margin-top: 20px;
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
