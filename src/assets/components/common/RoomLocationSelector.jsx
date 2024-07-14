import React, { useState, useEffect } from "react";
import { Select, Typography, Spin } from "antd";
import { getLocation } from "../utils/ApiFunctions";
import { EnvironmentOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const RoomTypeSelector = ({ handleRoomInputChange, selectedLocation, setSelectedLocation }) => {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getLocation().then((data) => {
			setLocations(data);
			setLoading(false);
		});
	}, []);

	const handleChange = (value) => {
		setSelectedLocation(value);
		handleRoomInputChange({ target: { name: 'roomLocation', value } });
	};

	return (
		<div>
				<Select
					required
					name="roomLocation"
					onChange={handleChange}
					value={selectedLocation || undefined} // Ensure value is undefined if not selected
					style={{ width: '100%' }}
					placeholder="Select a location"
					showSearch
					allowClear
				>
					{Array.isArray(locations) ? locations.map((location, index) => (
						<Option key={index} value={location.locationName}>
							{location.locationName}
						</Option>
					)) : null}
				</Select>
							
		</div>
	);
};

export default RoomTypeSelector;
