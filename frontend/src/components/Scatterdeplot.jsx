/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterPlotChart = ({ dataset }) => {
  const data = {
    datasets: [
      {
        label: 'Population vs Unemployment Rate',
        data: dataset.map((data) => ({
          x: data.population ,
          y: data.unemployment_rate,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true, 
    
    scales: {
      x: {
        title: {
          display: true,
          text: 'Population (in millions)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Unemployment Rate (%)',
        },
      },
    },
  };

  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ScatterPlotChart;
