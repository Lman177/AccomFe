import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import RoomLocationSelector from "../common/RoomLocationSelector";
import { Link } from "react-router-dom";
import { Form, Input, Button, Upload, Alert, Row, Col, Typography, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        roomTypeName: "",
        description: "",
        roomAddress: "",
        roomLocation: "",
        photo: null,
        roomPrice: ""
    });

    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setNewRoom({ ...newRoom, photo: selectedImage });
            setImagePreview(URL.createObjectURL(selectedImage));
        }
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const success = await addRoom(
                newRoom.photo,
                newRoom.roomTypeName,
                newRoom.roomPrice,
                newRoom.description,
                newRoom.roomAddress,
                newRoom.roomLocation
            );
            if (success !== undefined) {
                setSuccessMessage("A new room was added successfully!");
                setNewRoom({
                    photo: null,
                    roomTypeName: "",
                    roomPrice: "",
                    description: "",
                    roomAddress: "",
                    roomLocation: ""
                });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding new room");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <section className="container mt-5 mb-5">
            <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Title level={2} className="mt-5 mb-2" style={{ textAlign: "center" }}>Add a New Room</Title>
                    {successMessage && (
                        <Alert message={successMessage} type="success" showIcon style={{ marginBottom: "20px" }} />
                    )}
                    {errorMessage && (
                        <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: "20px" }} />
                    )}
                    <Form onFinish={handleSubmit} layout="vertical" encType="multipart/form-data">
                        <Form.Item label="What type of place will guests have?" name="roomTypeName" >
                            <RoomTypeSelector
                                handleRoomInputChange={handleRoomInputChange}
                                selectedRoomType={selectedRoomType}
                                setSelectedRoomType={setSelectedRoomType}
                            />
                        </Form.Item>
                        <Form.Item label="Number and Lane of your Place?" name="roomAddress" rules={[{ required: true, message: 'Please input the room address!' }]}>
                            <Input
                                name="roomAddress"
                                value={newRoom.roomAddress}
                                onChange={handleRoomInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Where's your place located?" name="roomLocation" >
                            <RoomLocationSelector
                                handleRoomInputChange={handleRoomInputChange}
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                            />
                        </Form.Item>
                        <Form.Item label="Room Photo" name="photo" rules={[{ required: true, message: 'Please upload a photo!' }]}>
                            <Input
                                type="file"
                                name="photo"
                                onChange={handleImageChange}
                            />
                        </Form.Item>
                        {imagePreview && (
                            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                <img
                                    src={imagePreview}
                                    alt="Preview room photo"
                                    style={{ maxWidth: "100%", maxHeight: "400px" }}
                                />
                            </div>
                        )}
                        <Form.Item label="Room Description" name="description" rules={[{ required: true, message: 'Please input the room description!' }]}>
                            <TextArea
                                name="description"
                                value={newRoom.description}
                                onChange={handleRoomInputChange}
                                rows={4}
                                style={{ fontSize: "1.2rem" }}
                            />
                        </Form.Item>
                        <Form.Item label="Room Price" name="roomPrice" rules={[{ required: true, message: 'Please input the room price!' }]}>
                            <Input
                                type="number"
                                name="roomPrice"
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                                <Link to={"/admin-rooms"}>
                                    <Button type="default">Existing rooms</Button>
                                </Link>
                                <Button type="primary" htmlType="submit">
                                    Save Room
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </section>
    );
};

export default AddRoom;
