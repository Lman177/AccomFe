import React, { useState } from "react";
import moment from "moment";
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomTypeName: { name: "" } },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
    price: "",
  });

  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomTypeName: { name: "" } },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
    price: "",
  };

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      setError(error.response && error.response.status === 404 ? error.response.data.message : error.message);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
    },
    title: {
      fontFamily: "'Arial', sans-serif",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    form: {
      width: "100%",
      maxWidth: "600px",
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    },
    formControl: {
      borderRadius: "50px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "1px solid #ccc",
      transition: "border-color 0.3s",
      marginBottom: "10px",
    },
    formControlFocus: {
      borderColor: "#007bff",
      boxShadow: "none",
    },
    btnPrimary: {
      backgroundColor: "#ff385c",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "10px 20px",
      marginBottom: "10px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    btnPrimaryHover: {
      backgroundColor: "#0056b3",
    },
    inputGroupText: {
      borderRadius: "50px",
    },
    loading: {
      fontSize: "18px",
      color: "#333",
    },
    textDanger: {
      color: "#d9534f",
    },
    heading: {
      fontFamily: "'Arial', sans-serif",
      fontWeight: "bold",
      color: "#333",
      gap: "10px",
    },
    textSuccess: {
      color: "#28a745",
    },
    bookingInfo: {
      fontSize: "16px",
      color: "#555",
      marginTop: "20px",
      marginBottom: "40px",
    },
    alertSuccess: {
      backgroundColor: "#dff0d8",
      color: "#3c763d",
      borderRadius: "5px",
      padding: "10px 20px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container} className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h2 style={styles.title}>Find My Booking</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div className="input-group mb-3">
          <input
            required
            style={styles.formControl}
            className="form-control"
            type="text"
            id="confirmationCode"
            name="confirmationCode"
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder="Enter the booking confirmation code"
          />
          <button type="submit" style={styles.btnPrimary} className="btn btn-primary input-group-text">
            Find Booking
          </button>
        </div>
      </form>

      {isLoading && <div style={styles.loading}>Finding your booking...</div>}
      {error && <div style={styles.textDanger}>Error: {error}</div>}

      {bookingInfo.bookingConfirmationCode && !isLoading && !error && (
        <div style={styles.bookingInfo}>
          <h3 style={styles.heading}><strong>Booking Information</strong></h3>
          <p style={styles.textSuccess}><strong>Confirmation Code:</strong> {bookingInfo.bookingConfirmationCode}</p>
          <p><strong>Room Type:</strong> {bookingInfo.room && bookingInfo.room.roomTypeName ? bookingInfo.room.roomTypeName.name : "N/A"}</p>
          <p><strong>Check-in Date:</strong> {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}</p>
          <p><strong>Check-out Date:</strong> {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}</p>
          <p><strong>Full Name:</strong> {bookingInfo.guestName}</p>
          <p><strong>Email Address:</strong> {bookingInfo.guestEmail}</p>
          <p><strong>Adults: </strong>{bookingInfo.numOfAdults}</p>
          <p><strong>Children:</strong> {bookingInfo.numOfChildren}</p>
          <p><strong>Total Guests:</strong> {bookingInfo.totalNumOfGuests}</p>
          <p><strong>Price:</strong> {bookingInfo.price}$</p>
        </div>
      )}

    </div>
  );
};

export default FindBooking;
