import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';

// Register all necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale);

const RevenueChart = () => {
    const [chartData, setChartData] = useState({ datasets: [] });
    const [chartOptions, setChartOptions] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookings/profit');
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
                        label: (tooltipItem) => `Revenue: ${tooltipItem.raw.y.toLocaleString()}`,
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        });
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="chart-container">
            <h3>Monthly Revenue Comparison</h3>
            <label htmlFor="month-select" className="month-label">Select Month: </label>
            <input
                type="month"
                id="month-select"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="month-input"
            />
            <div className="chart-wrapper">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <style>{`
                .chart-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background-color: #f5f5f5;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 800px;
                    margin: auto;
                }
                h3 {
                    color: #333;
                    margin-bottom: 20px;
                }
                .month-label {
                    margin-bottom: 10px;
                    font-size: 16px;
                }
                .month-input {
                    padding: 8px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }
                .chart-wrapper {
                    width: 600px;
                    height: 300px;
                }
            `}</style>
        </div>
    );
};

export default RevenueChart;