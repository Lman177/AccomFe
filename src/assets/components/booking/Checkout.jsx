import React, { useEffect, useState } from 'react';
import BookingForm from '../booking/BookingForm';
import User from '../User/User';
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getRoomById } from '../utils/ApiFunctions';
import ReviewBlock from '../Review/ReviewBlock';

const Checkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: '',
    roomTypeName: '',
    roomPrice: '',
    description: '',
    roomLocation: '',
    roomCapacity: '',
  });

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const response = await getRoomById(roomId);
        setRoomInfo(response);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchRoomInfo();
  }, [roomId]);

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <div className="flex-grow-1">
          {isLoading ? (
            <p>Loading room information...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="image-wrapper">
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room photo"
                  className="room-photo"
                />
              </div>
              <div className="mt-3">
                <h2>{roomInfo.roomTypeName.name} / {roomInfo.roomLocation}</h2>
                
                <h5>Max Capacity: {roomInfo.roomCapacity} guests</h5>
                <p>{roomInfo.description}</p>
                <h3 className="mt-4">${roomInfo.roomPrice} / night</h3>
                <hr />
                <h4>Amenities</h4>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <FaWifi /> Wifi
                  </li>
                  <li className="list-inline-item">
                    <FaTv /> Netflix Premium
                  </li>
                  <li className="list-inline-item">
                    <FaUtensils /> Breakfast
                  </li>
                  <li className="list-inline-item">
                    <FaWineGlassAlt /> Mini bar refreshment
                  </li>
                  <li className="list-inline-item">
                    <FaCar /> Car Service
                  </li>
                  <li className="list-inline-item">
                    <FaParking /> Parking Space
                  </li>
                  <li className="list-inline-item">
                    <FaTshirt /> Laundry
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="col-lg-5">
          {!isLoading && !error && <BookingForm />}
          {!isLoading && !error && <User roomId={roomId} />}
          <p className="text-center mt-3">  </p>
          <p className="text-center mt-3">  </p>
        </div>
        
      </div>
      <div>
        {!isLoading && !error && <ReviewBlock roomId={roomId} />}

        </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .image-wrapper {
          width: 100%;
          padding-top: 56.25%;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }

        .room-photo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .list-inline-item {
          display: inline-block;
          margin-right: 15px;
        }

        .text-center {
          text-align: center;
        }

        p {
          margin: 0;
          padding: 0;
        }

        h2,
        h3,
        h4 {
          margin-top: 15px;
          margin-bottom: 15px;
        }

        h3 {
          color: #ff5a5f;
        }

        ul {
          padding: 0;
        }

        ul.list-inline {
          list-style: none;
        }

        ul.list-inline li {
          font-size: 1.2em;
          margin-bottom: 10px;
        }

        ul.list-inline li svg {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
