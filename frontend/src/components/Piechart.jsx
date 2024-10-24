/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
const Piechart = ({dataset}) => {

    chartjs.register(ArcElement, Tooltip, Legend);



    const data = {
        labels: dataset.map((data) => data.country),
        datasets: [
          {
            label: 'Education Expenditure (%)',
            data: dataset.map((data) => data.education_expenditure_as_percent_of_gdp),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ], 
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
              },
            },
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
          <Pie data={data} options={options} />
        </div>
      );
}

export default Piechart
