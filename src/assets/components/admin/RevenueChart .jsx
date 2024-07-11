import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';
import { DatePicker, Space, Button } from 'antd';
import moment from 'moment';

// Register all necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale);

const RevenueChart = () => {
    const [chartData, setChartData] = useState({ datasets: [] });
    const [chartOptions, setChartOptions] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://35.238.250.153:8080/bookings/profit');
                processChartData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedMonth]);

    const processChartData = (data) => {
        const owners = [...new Set(data.map(item => item.ownerId))];
        const colors = [
            'rgba(255, 99, 132, 0.5)', // red
            'rgba(54, 162, 235, 0.5)', // blue
            'rgba(75, 192, 192, 0.5)', // greenish cyan
            'rgba(153, 102, 255, 0.5)', // purple
            'rgba(255, 159, 64, 0.5)',  // orange
            'rgba(255, 205, 86, 0.5)',  // yellow
            'rgba(201, 203, 207, 0.5)', // light gray
            'rgba(233, 30, 99, 0.5)',   // pink
            'rgba(0, 188, 212, 0.5)',   // cyan
            'rgba(255, 87, 34, 0.5)',   // deep orange
            'rgba(76, 175, 80, 0.5)',   // green
            'rgba(96, 125, 139, 0.5)',  // blue gray
            'rgba(63, 81, 181, 0.5)',   // indigo
            'rgba(244, 67, 54, 0.5)'    // bright red
        ];

        const filteredData = selectedMonth
            ? data.filter(item => `${item.year}-${String(item.month).padStart(2, '0')}` === selectedMonth)
            : data;

        const datasets = owners.map((owner, index) => ({
            label: `Owner ${owner}`,
            data: filteredData.filter(item => item.ownerId === owner).map(item => ({
                x: new Date(item.year, item.month - 1),
                y: item.totalRevenue,
            })),
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            borderWidth: 1,
        }));

        setChartData({ datasets });
        setChartOptions({
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month',
                        displayFormats: { month: 'MMM yyyy' },
                        tooltipFormat: 'MMM yyyy',
                    },
                    title: { display: true, text: 'Month' },
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Revenue' },
                    ticks: {
                        callback: (value) => (value % 1 === 0 ? value : null),
                    },
                },
            },
            plugins: {
                legend: { display: true },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `Revenue: ${tooltipItem.raw.y.toLocaleString()}$`,
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        });
    };

    const handleMonthChange = (date, dateString) => {
        setSelectedMonth(dateString);
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Monthly Revenue Comparison</h3>
            <Space direction="vertical" size="middle" style={styles.filterContainer}>
                <DatePicker
                    picker="month"
                    onChange={handleMonthChange}
                    style={styles.datePicker}
                    placeholder="Select Month"
                />
                
            </Space>
            <div style={styles.chartWrapper}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: 'auto',
        marginLeft: '25px',
    },
    header: {
        color: '#333',
        marginBottom: '20px',
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    datePicker: {
        marginRight: '10px',
    },
    button: {
        backgroundColor: '#1890ff',
        color: '#fff',
        borderRadius: '5px',
        padding: '10px',
    },
    chartWrapper: {
        width: '600px',
        height: '400px',
    },
};

export default RevenueChart;
