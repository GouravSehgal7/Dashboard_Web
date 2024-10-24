/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

const LineGraph = ({ dataset }) => {
  chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: 'black',
        },
      },
      title: {
        display: true,
        text: 'Real-Time Data: Population and Unemployment Rate',
        color: 'black', 
        font: {
          size: 20,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        titleColor: 'black',
        bodyColor: 'black', 
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
        },
        ticks: {
          color: 'black', 
        },
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: dataset.map((data) => data.country),
    datasets: [
      {
        label: 'Population',
        data: dataset.map((data) => data.population), 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3, 
      },
      {
        label: 'annual gdp (%)',
        data: dataset.map((data) => data.annual_gdp), 
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="w-full h-full"> 
      <Line options={options} data={data} />
    </div>
  );
};

export default LineGraph;
