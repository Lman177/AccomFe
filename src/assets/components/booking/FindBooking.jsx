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
  });
  const [isDeleted, setIsDeleted] = useState(false);

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

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setSuccessMessage("");
        setIsDeleted(false);
      }, 2000);
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center mb-4">Find My Booking</h2>
      <form onSubmit={handleFormSubmit} className="col-md-6">
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            id="confirmationCode"
            name="confirmationCode"
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder="Enter the booking confirmation code"
          />
          <button type="submit" className="btn btn-hotel input-group-text">
            Find booking
          </button>
        </div>
      </form>

      {isLoading && <div className="loading">Finding your booking...</div>}
      {error && <div className="text-danger">Error: {error}</div>}

      {bookingInfo.bookingConfirmationCode && !isLoading && !error && (
        <div className="col-md-6 mt-4 mb-5">
          <h3>Booking Information</h3>
          <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
          {/* <p>Room Number: {bookingInfo.room.id}</p> */}
          <p>Room Type: {bookingInfo.room && bookingInfo.room.roomTypeName ? bookingInfo.room.roomTypeName.name : "N/A"}</p>
          <p>Check-in Date: {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}</p>
          <p>Check-out Date: {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}</p>
          <p>Full Name: {bookingInfo.guestName}</p>
          <p>Email Address: {bookingInfo.guestEmail}</p>
          <p>Adults: {bookingInfo.numOfAdults}</p>
          <p>Children: {bookingInfo.numOfChildren}</p>
          <p>Total Guests: {bookingInfo.totalNumOfGuests}</p>

          {!isDeleted && (
            <button onClick={handleBookingCancellation} className="btn btn-danger">
              Cancel Booking
            </button>
          )}
        </div>
      )}

      {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        h2 {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          color: #333;
        }

        .form-control {
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 16px;
          border: 1px solid #ccc;
          transition: border-color 0.3s;
        }

        .form-control:focus {
          border-color: #ff385c;
          box-shadow: none;
        }

        .btn-hotel {
          background-color: #ff385c;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-hotel:hover {
          background-color: #ff5a70;
        }

        .input-group-text {
          border-radius: 50px;
        }

        .loading {
          font-size: 18px;
          color: #333;
        }

        .text-danger {
          color: #d9534f;
        }

        h3 {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          color: #333;
          gap: 10px;
        }

        .text-success {
          color: #5cb85c;
        }

        p {
          font-size: 16px;
          color: #555;
        }

        .btn-danger {
          background-color: #d9534f;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-danger:hover {
          background-color: #c9302c;
        }

        .alert-success {
          background-color: #dff0d8;
          color: #3c763d;
          border-radius: 5px;
          padding: 10px 20px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default FindBooking;
