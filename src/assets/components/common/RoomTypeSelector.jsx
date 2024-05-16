import React, { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
	const [roomTypes, setRoomTypes] = useState([""])
	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
	const [newRoomType, setNewRoomType] = useState("")

	useEffect(() => {
		getRoomTypes().then((data) => {
			setRoomTypes(data)
		})
	}, [])


	return (
		<>
			{roomTypes.length > 0 && (
				<div>
					<select
						required
						className="form-select"
						name="roomTypeName"
						onChange={(e) => {
								handleRoomInputChange(e)
							
						}}
						>
						<option value="">Select a room type</option>
						{roomTypes.map((roomType, index) => (
            
			            <option key={index} value={roomType.name}>
			                {roomType.name}
			            </option>
			        ))}
					</select>
					
				</div>
			)}
		</>
	)
}

export default RoomTypeSelector