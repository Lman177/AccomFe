import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, Card, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { MonthPicker } = DatePicker;

const BookingStats = () => {
    const [bookingCounts, setBookingCounts] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('');

    // Fetch booking data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookings/all-bookings');
                const bookingsData = response.data;
                
                // Helper function to format month-year key
                const formatMonthYear = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                // Accumulate bookings by month
                const counts = bookingsData.reduce((acc, { checkInDate }) => {
                    const date = new Date(...checkInDate);
                    const key = formatMonthYear(date);
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {});

                setBookingCounts(counts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMonthChange = (date, dateString) => setSelectedMonth(dateString);

    // Calculate total bookings for selected month, or overall if no month selected
    const totalBookings = selectedMonth ? bookingCounts[selectedMonth] || 0 : Object.values(bookingCounts).reduce((sum, count) => sum + count, 0);

    return (
        <div style={{ 
            padding: '20px',
            backgroundColor: '#f5f5f5',
            width: '30%',
            height: '40%',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'  // Added slight shadow for depth
        }}>
            <Title level={4} style={{ marginBottom: '20px' }}><CalendarOutlined /> Monthly Statistics</Title>
            <MonthPicker 
                placeholder="Select Month"
                onChange={handleMonthChange}
                format="YYYY-MM"
                style={{ marginBottom: '20px', width: '100%' }}
            />
            <Card bordered={false} style={{ textAlign: 'center', width: '100%' }}>
                <Text>Total Bookings: {totalBookings}</Text>
            </Card>
        </div>
    );
};

export default BookingStats;