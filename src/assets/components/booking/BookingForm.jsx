import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, Button, Modal } from "react-bootstrap";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import BookingSummary from "./BookingSumary"

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const currentUser = localStorage.getItem("userEmail")
  const userNames = localStorage.getItem("name")
  const [booking, setBooking] = useState({
    guestFullName: userNames,
    guestEmail: currentUser,
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",

  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
      setRoomCapacity(response.roomCapacity);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCount = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must be after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Calculate totalCount directly here
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCount = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCount;
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } 
    else {
      if(totalCount >= roomCapacity){
        setErrorMessage("Room capacity exceeded");
      }
      else{
        setShowModal(true);
        setValidated(true);
      }
    }

  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mb-5 booking-form-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-body booking-card">
            <h4 className="card-title">Reserve Room</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestFullName" className="hotel-color">
                  Fullname
                </Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your fullname.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail" className="hotel-color">
                  Email
                </Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  placeholder="Enter your email"
                  value={booking.guestEmail}
                  onChange={handleInputChange}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset>
                
                  <div >
                    <Form.Label htmlFor="checkInDate" className="hotel-color">
                      Check-in date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      placeholder="check-in-date"
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-in date.
                    </Form.Control.Feedback>
                  </div>
                  <div >
                    <Form.Label htmlFor="checkOutDate" className="hotel-color">
                      Check-out date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      placeholder="check-out-date"
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-out date.
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                
              </fieldset>

              <fieldset>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="numberOfAdults" className="hotel-color">
                      Adults
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="numberOfAdults"
                      name="numberOfAdults"
                      value={booking.numberOfAdults}
                      min={1}
                      placeholder="0"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select at least 1 adult.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="numberOfChildren" className="hotel-color">
                      Children
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="numberOfChildren"
                      name="numberOfChildren"
                      value={booking.numberOfChildren}
                      placeholder="0"
                      min={0}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Select 0 if no children.
                    </Form.Control.Feedback>
                  </div>
                </div>
              </fieldset>

              <div className="form-group mt-3">
                <Button type="submit" className="btn btn-primary w-100">
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingSummary
            booking={booking}
            payment={calculatePayment()}
            onConfirm={handleFormSubmit}
            isFormValid={validated}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
  .booking-form-container {
    margin-top: 50px;
    max-width: 1400px;
  }
  
  .booking-card {
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: none;
    padding: 20px;
  }
  
  .card-title {
    color: #ff5a5f;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .hotel-color {
    color: #555;
  }
  
  .form-group {
    margin-top: 20px;
  }
  
  .btn-primary {
    background-color: #ff5a5f;
    border: none;
    font-size: 1.1em;
  }
  
  .error-message {
    margin-top: 10px;
    font-size: 0.9em;
  }
  `}</style>

    </div>
  );
};

export default BookingForm;
