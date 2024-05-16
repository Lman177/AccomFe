import React, { useEffect, useState } from "react"
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { Link, useParams } from "react-router-dom"
import RoomTypeSelector from "../common/RoomTypeSelector"
import RoomLocationSelector from "../common/RoomLocationSelector"

const EditRoom = () => {    

        const [room, setRoom] = useState({
            photo: "",
            roomTypeName: "",
            roomPrice: "",
			roomAddress:"",
			roomLocation:"",
			description:""
        })
    
        const [successMessage, setSuccessMessage] = useState("")
        const [errorMessage, setErrorMessage] = useState("")
        const [imagePreview, setImagePreview] = useState("")
        const { roomId } = useParams()
  
        const handleImageChange = (e) => {
            const selectedImage = e.target.files[0]
            setRoom({ ...room, photo: selectedImage })
            setImagePreview(URL.createObjectURL(selectedImage))
        }
        const handleInputChange = (e) => {
            const {name, value} = e.target
            setRoom({ ...room, [name]: value })
        }

        useEffect(() => {
            const fetchRoom = async () => {
                try {
                    const roomData = await getRoomById(roomId)
                    setRoom(roomData)
                    setImagePreview(roomData.photo)
                } catch (error) {
                    console.error(error)
                }
            }
    
            fetchRoom()
        }, [roomId])

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const response = await updateRoom(roomId, room)
                if (response.status === 200) {
                    setSuccessMessage("Room updated successfully!")
                    const updateRoomData = await getRoomById(roomId)
                    setRoom(updateRoomData)
                    setImagePreview(updateRoomData.photo)
                    setErrorMessage("")
                } else {
                    setErrorMessage("Error updating room")
                }
            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
            
        }

                return (
                    <div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Room</h3>
			<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
			
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roomTypeName" className="form-label">
									What type of place will guests have?
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleInputChange}
										value={room.roomTypeName}
									/>
								</div>
							</div>
							<div className="mb-3">
									<label htmlFor="roomAddress" className="form-label">
										Number and Lane of your Place?
									</label>
									<input
										required
										type="text"
										className="form-control"
										id="roomAddress"
										name="roomAddress"
										value={room.roomAddress}
										onChange={handleInputChange}
									/>
								</div>
							<div className="mb-3">
								<label htmlFor="roomLocation" className="form-label">
									Where's your place located?</label>
								<div>
									<RoomLocationSelector
										handleRoomInputChange={handleInputChange}
										value={room.roomLocation}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Room Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview  room photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Room Description
									</label>
									<input
										required
										type="text"
										className="form-control"
										id="description"
										name="description"
										value={room.description}
										onChange={handleInputChange}
									/>
								</div>
								<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label">
									Room Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={room.roomPrice}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
    
}
export default EditRoom