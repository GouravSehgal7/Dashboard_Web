/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

const Barchart = ({ dataset }) => {
  chartjs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const data = {
    labels: dataset.map((data) => data.country),
    datasets: [
      {
        label: 'Unemployment Rate (%)',
        data: dataset.map((data) => data.unemployment_rate),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Barchart;
