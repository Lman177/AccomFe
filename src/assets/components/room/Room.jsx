import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../utils/ApiFunctions';
import RoomCard from './RoomCard';

import { Col, Container, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';

const Room = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getAllRooms()
            .then(data => {
                setData(data);
                setFilteredData(data);  // Set filteredData to initial data
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading rooms...</div>;
    }
    if (error) {
        return <div>Something went wrong...{error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);  // Correct calculation for total pages

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData.slice(startIndex, endIndex).map((room) => (
            <RoomCard key={room.id} room={room} />
        ));
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>
                {renderRooms()}
            </Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Room;
