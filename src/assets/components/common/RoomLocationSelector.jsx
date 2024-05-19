import React, { useState, useEffect } from "react"
import { getLocation } from "../utils/ApiFunctions"


const RoomTypeSelector = ({ handleRoomInputChange, selectedLocation, setSelectedLocation }) => {
	const [locations, setLocations] = useState([""])


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
							setSelectedLocation(e.target.value)
							handleRoomInputChange(e)
						}}
						value={selectedLocation}
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