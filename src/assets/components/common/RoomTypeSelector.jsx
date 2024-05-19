import React, { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange, selectedRoomType, setSelectedRoomType }) => {
	const [roomTypes, setRoomTypes] = useState([])


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
							setSelectedRoomType(e.target.value)
							handleRoomInputChange(e)
						}}
						value={selectedRoomType}>
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
