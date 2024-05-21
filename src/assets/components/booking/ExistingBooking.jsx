import React, { useState, useEffect } from "react";
import { Table, Button, Spin, Alert, Typography, DatePicker, Space } from "antd";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import moment from "moment";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ExistingBooking = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookingInfo(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const filteredBookings = bookingInfo.filter((booking) => {
    if (!dateRange[0] || !dateRange[1]) return true;
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    return checkInDate.isBetween(dateRange[0], dateRange[1], undefined, '[]') ||
           checkOutDate.isBetween(dateRange[0], dateRange[1], undefined, '[]');
  });

  const columns = [
    {
      title: "S/N",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room ID",
      dataIndex: ["room", "id"],
      key: "room.id",
    },
    {
      title: "Room Type",
      dataIndex: ["room", "roomTypeName", "name"],
      key: "room.roomTypeName.name",
    },
    {
      title: "Check-In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
    },
    {
      title: "Check-Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
    },
    {
      title: "Guest Name",
      dataIndex: "guestName",
      key: "guestName",
    },
    {
      title: "Guest Email",
      dataIndex: "guestEmail",
      key: "guestEmail",
    },
    {
      title: "Adults",
      dataIndex: "numOfAdults",
      key: "numOfAdults",
    },
    {
      title: "Children",
      dataIndex: "numOfChildren",
      key: "numOfChildren",
    },
    {
      title: "Total Guest",
      dataIndex: "totalNumOfGuests",
      key: "totalNumOfGuests",
    },
    {
      title: "Confirmation Code",
      dataIndex: "bookingConfirmationCode",
      key: "bookingConfirmationCode",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleBookingCancellation(record.id)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <section>
      <Title level={2}>Existing Bookings</Title>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
          />
        )}
        <RangePicker onChange={handleDateRangeChange} style={{ marginBottom: 20 }} />
        {isLoading ? (
          <Spin tip="Loading existing bookings..." size="large" />
        ) : (
          <Table
            dataSource={filteredBookings}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Space>
    </section>
  );
};

export default ExistingBooking;
