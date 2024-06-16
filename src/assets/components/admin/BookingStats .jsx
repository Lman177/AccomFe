import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, Card, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { MonthPicker } = DatePicker;

const BookingStats = () => {
    const [bookingCounts, setBookingCounts] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/bookings/all-bookings')
            .then(response => {
                const data = response.data;

                // Function to format month and year as a key
                const formatMonthYear = (year, month) => {
                    return `${year}-${String(month).padStart(2, '0')}`;
                };

                // Calculate the number of bookings per month
                const counts = data.reduce((acc, booking) => {
                    const checkInDate = new Date(booking.checkInDate[0], booking.checkInDate[1] - 1, booking.checkInDate[2]);
                    const monthYear = formatMonthYear(checkInDate.getFullYear(), checkInDate.getMonth() + 1);
                    if (!acc[monthYear]) {
                        acc[monthYear] = 0;
                    }
                    acc[monthYear]++;
                    return acc;
                }, {});

                setBookingCounts(counts);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleMonthChange = (date, dateString) => {
        setSelectedMonth(dateString);
    };

    const totalBookings = selectedMonth ? bookingCounts[selectedMonth] || 0 : Object.values(bookingCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="booking-stats" 
        style={{ 
            padding: '20px',
            backgroundColor: '#f0f2f5',
            width: '30%',
            height: '40%',
            }}>
            <Title level={2}><CalendarOutlined /> Monthly Booking Statistics</Title>
            <MonthPicker 
                placeholder="Select Month" 
                onChange={handleMonthChange} 
                format="YYYY-MM"
                style={{ marginBottom: 20, width: '100%' }}
            />
            <Card className="total-bookings" style={{ textAlign: 'center', width: '100%' }}>
                <Text>Total Bookings: </Text>
                <Text strong style={{ fontSize: '2em' }}>{totalBookings}</Text>
            </Card>
        </div>
    );
};

export default BookingStats;
