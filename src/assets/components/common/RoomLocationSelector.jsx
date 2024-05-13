import React, { useState, useEffect } from "react"
import { getLocation } from "../utils/ApiFunctions"


const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
	const [locations, setLocations] = useState([""])
	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
	const [newLocation, setNewLocation] = useState("")

	useEffect(() => {
		getLocation().then((data) => {
			setLocations(data)
		})
	}, [])

	const handleLocationInputChange = (e) => {
		setNewLocation(e.target.value)
	}

	// const handleAddNewRoomType = () => {
	// 	if (newRoomType !== "") {
	// 		setLocations([...locations, newLocation])
	// 		setNewLocation("")
	// 		setShowNewRoomTypeInput(false)
	// 	}
	// }

	return (
		<>
			{locations.length > 0 && (
				<div>
					<select
						required
						className="form-select"
						name="roomLocation"
						onChange={(e) => {
								handleRoomInputChange(e)
							
						}}
						value={newRoom.roomLocation}>
						<option value="">Select District</option>
						{locations.map((roomLocation, index) => (
			            <option key={index} value={roomLocation.locationName}>
			                {roomLocation.locationName}
			            </option>
			        ))}
					</select>
					{/* {showNewRoomTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New Room Type"
									value={newRoomType}
									onChange={handleLocationInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
									Add
								</button>
							</div>
						</div>
					)} */}
				</div>
			)}
		</>
	)
}

export default RoomTypeSelector