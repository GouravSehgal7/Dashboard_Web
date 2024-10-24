/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as chartjs, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

const RadarChart = ({ dataset }) => {
  chartjs.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

  const data = {
    labels: dataset.map((data) => data.country),
    datasets: [
      {
        label: 'GDP ($)',
        data: dataset.map((data) => data.annual_gdp),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        pointBackgroundColor: 'rgba(255, 206, 86, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
