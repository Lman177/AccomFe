import React, { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser, cancelBooking } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Avatar, Modal, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    phoneNumber: "",
    lastName: "",
    roles: [{ id: "", name: "" }]
  });

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
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
  }, [userEmail]);

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
  }, [userEmail]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      await deleteUser(userEmail)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRole");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
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

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-success">{message}</p>}
      {user ? (
        <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
          <h4 className="card-title text-center">User Information</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Avatar size={80} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">ID:</label>
                        <div className="col-md-10 mt-2">
                          <p className="card-text">{user.id}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">First Name:</label>
                        <div className="col-md-10 mt-2">
                          <p className="card-text">{user.firstName}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">Phone Number:</label>
                        <div className="col-md-10 mt-2">
                          <p className="card-text">{user.phoneNumber}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">Email:</label>
                        <div className="col-md-10 mt-2">
                          <p className="card-text">{user.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">Roles:</label>
                        <div className="col-md-10 mt-2">
                          <ul className="list-unstyled">
                            {user.roles && user.roles.map((role) => (
                              <li key={role.id} className="card-text">
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="card-title text-center">Booking History</h4>

              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th scope="col">Room Type</th>
                      <th scope="col">Room Location</th>
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
                          <td>{booking.room.roomTypeName.name}</td>
                          <td>{booking.room.roomAddress}, {booking.room.roomLocation.locationName}</td>
                          <td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
                          <td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
                          <td>{booking.bookingConfirmationCode}</td>
                          <td className={isPastCheckout ? 'text-muted' : 'text-success'}>
                            {isPastCheckout ? 'Completed' : 'On-going'}
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => showModal(booking.id)}>
                              Cancel
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>You have not made any bookings yet.</p>
              )}

              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                    Close account
                  </button>
                </div>
              </div>
            </div>
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
        }

        .text-success {
          color: #28a745;
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

        .btn-sm {
          padding: 0.25rem 0.5rem;
        }

        .mt-5 {
          margin-top: 3rem;
        }

        .mt-2 {
          margin-top: 0.5rem;
        }

        .mb-3 {
          margin-bottom: 1rem;
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

        .col-form-label {
          text-align: right;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .g-0 {
          margin-left: 0;
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

export default Profile;
