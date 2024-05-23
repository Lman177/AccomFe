import React, { useState, useEffect } from "react";
import { Select, Typography, Spin } from "antd";
import { getRoomTypes } from "../utils/ApiFunctions";
import { HomeOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const RoomTypeSelector = ({ handleRoomInputChange, selectedRoomType, setSelectedRoomType }) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
            setLoading(false);
        });
    }, []);

    const handleChange = (value) => {
        setSelectedRoomType(value);
        handleRoomInputChange({ target: { name: 'roomTypeName', value } });
    };

    return (
        <div>    
            <Select
                required
                name="roomTypeName"
                onChange={handleChange}
                value={selectedRoomType || undefined} // Ensure value is undefined if not selected
                style={{ width: '100%' }}
                placeholder="Select a room type"
                showSearch
                allowClear
            >
                {roomTypes.map((roomType, index) => (
                    <Option key={index} value={roomType.name}>
                        {roomType.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default RoomTypeSelector;
