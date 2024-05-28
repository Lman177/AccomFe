import React, { useEffect, useState } from "react";
import BookingForm from "../booking/BookingForm";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import "./Checkout.css";

const Checkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomTypeName: "",
    roomPrice: "",
    description: ""
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 1000);
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
                <h2>{roomInfo.roomTypeName.name}</h2>
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
        <div  className="col-lg-5" >
          {!isLoading && !error && <BookingForm />}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
