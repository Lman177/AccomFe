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
						>
						<option value="">Select District</option>
						{locations.map((roomLocation, index) => (
			            <option key={index} value={roomLocation.locationName}>
			                {roomLocation.locationName}
			            </option>
			        ))}
					</select>
				</div>
			)}
		</>
	)
}

export default RoomTypeSelector