import React, { useState, useEffect } from "react";
import { Button, Spin, Alert, Typography, Space, Modal, Descriptions } from "antd";
import { cancelBooking, getBookingOfOwner } from "../utils/ApiFunctions";
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

const { Title } = Typography;
const localizer = momentLocalizer(moment);

const ExistingBookingOfOwner = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookingOfOwner();
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
      const data = await getBookingOfOwner();
      setBookingInfo(data);
      setIsModalVisible(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const events = bookingInfo.map(booking => ({
    id: booking.id,
    title: booking.guestName,
    start: new Date(booking.checkInDate), // Ensure these are valid date strings
    end: new Date(booking.checkOutDate),
    ...booking,
  }));

  const handleSelectEvent = (event) => {
    setSelectedBooking(event);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <section>
      <Title level={2}>Bookings</Title>
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
        {isLoading ? (
          <Spin tip="Loading existing bookings..." size="large" />
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }} // You may adjust this to 'auto' or specific height based on your layout
            onSelectEvent={handleSelectEvent}
          />
        )}
        <Modal
          title="Booking Details"
          visible={isModalVisible}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Close
            </Button>,
            <Button key="delete" type="primary" danger onClick={() => handleBookingCancellation(selectedBooking.id)}>
              Cancel Booking
            </Button>,
          ]}
          bodyStyle={{ padding: '24px', height: 'auto' }}
          width="100%"
          maxWidth={600}
        >
          {selectedBooking && (
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Room Type">{selectedBooking?.room?.roomTypeName?.name ?? "n/a"}</Descriptions.Item>              
              <Descriptions.Item label="Room Type">{selectedBooking?.room?.roomLocation?.locationName ?? "n/a"}</Descriptions.Item>              
              <Descriptions.Item label="Check-In Date">{moment(selectedBooking.checkInDate).format('YYYY-MM-DD')}</Descriptions.Item>
              <Descriptions.Item label="Check-Out Date">{moment(selectedBooking.checkOutDate).format('YYYY-MM-DD')}</Descriptions.Item>
              <Descriptions.Item label="Guest Name">{selectedBooking.guestName}</Descriptions.Item>
              <Descriptions.Item label="Guest Email">{selectedBooking.guestEmail}</Descriptions.Item>
              <Descriptions.Item label="Adults">{selectedBooking.numOfAdults}</Descriptions.Item>
              <Descriptions.Item label="Children">{selectedBooking.numOfChildren}</Descriptions.Item>
              <Descriptions.Item label="Total Guests">{selectedBooking.totalNumOfGuests}</Descriptions.Item>
              <Descriptions.Item label="Confirmation Code">{selectedBooking.bookingConfirmationCode}</Descriptions.Item>
              <Descriptions.Item label="Price">{selectedBooking.price}</Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Space>
    </section>
  );
};

export default ExistingBookingOfOwner;
