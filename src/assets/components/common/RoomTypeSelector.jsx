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

	const handleNewRoomTypeInputChange = (e) => {
		setNewRoomType(e.target.value)
	}

	const handleAddNewRoomType = () => {
		if (newRoomType !== "") {
			setRoomTypes([...roomTypes, newRoomType])
			setNewRoomType("")
			setShowNewRoomTypeInput(false)
		}
	}

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
						value={newRoom.roomTypeName}>
						<option value="">Select a room type</option>
						{roomTypes.map((roomType, index) => (
            
			            <option key={index} value={roomType.name}>
			                {roomType.name}
			            </option>
			        ))}
					</select>
					{showNewRoomTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New Room Type"
									value={newRoomType}
									onChange={handleNewRoomTypeInputChange}
								/>
		
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default RoomTypeSelector