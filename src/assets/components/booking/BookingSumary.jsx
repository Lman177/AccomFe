import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="booking-summary-container">
      <div>
        <div className="summary-item">
          <span className="summary-label">Name:</span>
          <span className="summary-value">{booking.guestFullName}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Email:</span>
          <span className="summary-value">{booking.guestEmail}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Check-in Date:</span>
          <span className="summary-value">{moment(booking.checkInDate).format("MMM Do YYYY")}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Check-out Date:</span>
          <span className="summary-value">{moment(booking.checkOutDate).format("MMM Do YYYY")}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Number of Days Booked:</span>
          <span className="summary-value">{numberOfDays}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Number of Guests:</span>
          <span className="summary-value">
            {booking.numberOfAdults} Adult{booking.numberOfAdults > 1 ? "s" : ""}, {booking.numberOfChildren} Child{booking.numberOfChildren !== 1 ? "ren" : ""}
          </span>
        </div>
        <div className="summary-payment text-center">
          <h5>Total Payment:</h5>
          <p className="payment-amount">${payment}</p>
        </div>
        {payment > 0 ? (
          <>
            {isFormValid && !isBookingConfirmed ? (
              <Button variant="success" className="btn-block" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Processing Payment...
                  </>
                ) : (
                  "Confirm Booking & Proceed to Payment"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger text-center">Check-out date must be after check-in date.</p>
        )}
      </div>
      <style jsx>{`.booking-summary-container {
    max-width: 600px;
    margin: auto;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .summary-label {
    font-weight: bold;
    color: #333;
  }
  
  .summary-value {
    color: #555;
  }
  
  .summary-payment {
    margin-top: 20px;
  }
  
  .payment-amount {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .btn-block {
    width: 100%;
    margin-top: 20px;
  }
  `}</style>

    </div>
  );
};

export default BookingSummary;
