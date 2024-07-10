import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const RoomDetails = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomTypeName: "",
    roomPrice: "",
    description: "",
    roomLocation: "",
    roomCapacity: "",
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
          setError(error.message);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div className="container mt-5">

      <div className="d-flex flex-column align-items-center">
        {isLoading ? (
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            <div className="image-wrapper">
              <img
                src={`data:image/png;base64,${roomInfo.photo}`}
                alt="Room photo"
                className="room-photo"
              />
            </div>
            <div className="mt-3 text-center">
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
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: auto;
        }

        .image-wrapper {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .room-photo {
          max-width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 10px;
        }

        .list-inline-item {
          margin: 10px 15px;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
};

export default RoomDetails;
