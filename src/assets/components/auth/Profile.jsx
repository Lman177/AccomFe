import React, { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser, cancelBooking, rateRoom } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Avatar, Modal, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RateRoomModal from "../booking/RateRoomModal";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    roles: [{ id: "", name: "" }]
  });
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userEmail, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userEmail, token]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userEmail, token);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userEmail, token]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const response = await deleteUser(userEmail);
        setMessage(response.data);
        localStorage.clear();
        navigate("/");
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.data);
      }
    }
  };

  const showModal = (bookingId) => {
    setCurrentBookingId(bookingId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentBookingId(null);
  };

  const handleBookingCancellation = async () => {
    if (currentBookingId) {
      try {
        await cancelBooking(currentBookingId);
        setMessage("Booking cancelled successfully.");
        setBookings(bookings.filter((booking) => booking.id !== currentBookingId));
        notification.success({
          message: 'Success',
          description: 'Booking cancelled successfully.',
        });
      } catch (error) {
        setErrorMessage(`Error cancelling booking: ${error.message}`);
        notification.error({
          message: 'Error',
          description: `Error cancelling booking: ${error.message}`,
        });
      }
    }
    setIsModalVisible(false);
  };

  const showRateModal = (bookingId) => {
    setCurrentBookingId(bookingId);
    setIsRateModalVisible(true);
  };

  const closeRateModal = () => {
    setIsRateModalVisible(false);
    setCurrentBookingId(null);
  };

  const submitRate = async (roomId, rating, comment) => {
    try {
      await rateRoom(roomId, rating, comment);
      notification.success({
        message: 'Review Submitted',
        description: 'Your review has been successfully submitted!'
      });
      setSubmittedReviews((prevReviews) => ({
        ...prevReviews,
        [roomId]: true,
      }));
      closeRateModal();
    } catch (error) {
      notification.error({
        message: 'Error Submitting Review',
        description: error.message
      });
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-success">{message}</p>}
      {user ? (
        <div className="card p-5 mt-5 shadow-lg rounded">
          <h4 className="card-title text-center mb-4">User Information</h4>
          <div className="row">
            <div className="col-md-3 text-center mb-3">
              <Avatar size={80} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <div className="mt-3">
                <Link to="/update-profile" className="btn btn-secondary btn-sm">
                  Update Profile
                </Link>
              </div>
            </div>
            <div className="col-md-9">
              <div className="mb-3">
                <label><strong>ID:</strong> {user.id}</label>
              </div>
              <div className="mb-3">
                <label><strong>First Name:</strong> {user.firstName}</label>
              </div>
              <div className="mb-3">
                <label><strong>Phone Number:</strong> {user.phoneNumber}</label>
              </div>
              <div className="mb-3">
                <label><strong>Email:</strong> {user.email}</label>
              </div>
              <div className="mb-3">
                <label><strong>Roles:</strong></label>
                <ul>
                  {user.roles.map((role) => (
                    <li key={role.id}>{role.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <h4 className="card-title text-center mt-5 mb-4">Booking History</h4>
          {bookings.length > 0 ? (
            <table className="table table-bordered table-hover shadow">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Check In Date</th>
                  <th scope="col">Check Out Date</th>
                  <th scope="col">Confirmation Code</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  const checkOutDate = moment(booking.checkOutDate, "YYYY-MM-DD");
                  const currentDate = moment();
                  const isPastCheckout = currentDate.isAfter(checkOutDate);
                  return (
                    <tr key={index}>
                      <td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
                      <td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
                      <td>{booking.bookingConfirmationCode}</td>
                      <td className={isPastCheckout ? 'text-muted' : 'text-success'}>
                        {isPastCheckout ? (
                          <span>Completed</span>
                        ) : (
                          'On-going'
                        )}
                      </td>
                      <td>
                      {
                        booking.review === true ? (
                          'Reviewed'
                        ) : isPastCheckout ? (
                          submittedReviews[booking.room.id] ? (
                            <span>Reviewed</span>
                          ) : (
                            <button className="btn btn-primary btn-sm mx-2" onClick={() => showRateModal(booking.room.id)}>
                              Rate
                            </button>
                          )
                        ) : (
                          <button className="btn btn-danger btn-sm mx-2" onClick={() => showModal(booking.id)}>
                            Cancel
                          </button>
                        )
                      }
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>You have not made any bookings yet.</p>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Close Account
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <Modal
        title="Confirm Cancellation"
        visible={isModalVisible}
        onOk={handleBookingCancellation}
        onCancel={handleCancel}
        okText="Yes, Cancel"
        cancelText="No"
      >
        <p>Are you sure you want to cancel this booking?</p>
      </Modal>

      <RateRoomModal
        isVisible={isRateModalVisible}
        onRate={submitRate}
        onCancel={closeRateModal}
        roomId={currentBookingId}
      />

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          border-radius: 10px;
        }

        .shadow {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .text-danger {
          color: #dc3545;
          font-weight: bold;
        }

        .text-success {
          color: #28a745;
          font-weight: bold;
        }

        .text-muted {
          color: #6c757d;
        }

        .text-center {
          text-align: center;
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
        }

        .btn-sm {
          padding: 0.25rem 0.5rem;
        }

        .mt-5 {
          margin-top: 3rem;
        }

        .mt-4 {
          margin-top: 1.5rem;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }

        .fw-bold {
          font-weight: bold;
        }

        .d-flex {
          display: flex;
        }

        .justify-content-center {
          justify-content: center;
        }

        .align-items-center {
          align-items: center;
        }

        .mx-2 {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }

        @media (max-width: 768px) {
          .card-body {
            text-align: center;
          }

          .col-form-label {
            text-align: left;
          }

          .table {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
