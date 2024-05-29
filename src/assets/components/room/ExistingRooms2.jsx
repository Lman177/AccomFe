import React, { useEffect, useState } from "react";
import { Table, Space, message, Spin, Typography, Select, Alert, Button } from "antd";
import { getAllRooms, deleteRoom, getRoomTypes, getLocation } from "../utils/ApiFunctions";
import { FaTrashAlt } from "react-icons/fa";

const { Title } = Typography;
const { Option } = Select;

const ExistingRooms2 = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locations, setLocation] = useState([]);

    useEffect(() => {
        fetchRooms();
        fetchRoomTypes();
        fetchLocations();
    }, []);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const fetchRoomTypes = async () => {
        try {
            const result = await getRoomTypes();
            setRoomTypes(result);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const fetchLocations = async () => {
        try {
            const result = await getLocation();
            setLocation(result);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === "") {
                setSuccessMessage(`Room No ${roomId} was deleted`);
                fetchRooms();
            } else {
                console.error(`Error deleting room : ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const handleRoomTypeChange = (value) => {
        setSelectedRoomType(value);
    };

    const handleLocationChange = (value) => {
        setSelectedLocation(value);
    };

    const filteredRooms = rooms.filter(room => {
        return (
            (selectedRoomType ? room.roomTypeName.name === selectedRoomType : true) &&
            (selectedLocation ? room.roomLocation === selectedLocation : true)
        );
    });

    const columns = [
        {
            title: 'Room ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Owner ID',
            dataIndex: 'ownerId',
            key: 'ownerId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Room Type',
            dataIndex: 'roomTypeName',
            key: 'roomTypeName',
            render: (roomTypeName) => roomTypeName.name,
        },
        {
            title: 'Room Price',
            dataIndex: 'roomPrice',
            key: 'roomPrice',
        },
        {
            title: 'Room Location',
            dataIndex: 'roomLocation',
            key: 'roomLocation',
            render: (roomLocation) => roomLocation,
        },
        {
            title: 'Room Address',
            dataIndex: 'roomAddress',
            key: 'roomAddress',
            render: (roomAddress) => roomAddress,
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(record.id)}
                    >
                        <FaTrashAlt />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", backgroundColor: "whitesmoke" }}>
            <Title level={2}>Existing Rooms</Title>
            {successMessage && <Alert message="Success" description={successMessage} type="success" showIcon closable />}
            {errorMessage && <Alert message="Error" description={errorMessage} type="error" showIcon closable />}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                <Select
                    placeholder="Select a room type"
                    onChange={handleRoomTypeChange}
                    value={selectedRoomType}
                    style={{ width: 200 }}
                >
                    <Option value="">All Room Types</Option>
                    {roomTypes.map((roomType) => (
                        <Option key={roomType.id} value={roomType.name}>
                            {roomType.name}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Select location"
                    onChange={handleLocationChange}
                    value={selectedLocation}
                    style={{ width: 200 }}
                >
                    <Option value="">All Locations</Option>
                    {locations.map((location, index) => (
                        <Option key={index} value={location.locationName}>
                            {location.locationName}
                        </Option>
                    ))}
                </Select>
            </div>
            {isLoading ? (
                <Spin tip="Loading existing rooms..." size="large" />
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredRooms}
                    rowKey="id"
                    pagination={{ pageSize: 6 }}
                />
            )}
        </div>
    );
};

export default ExistingRooms2;
