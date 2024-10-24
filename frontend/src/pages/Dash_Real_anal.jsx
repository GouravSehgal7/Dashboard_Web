/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { realdata } from '../../data2';
import LineGraph from '../components/Line'
import Piechart from '../components/Piechart';
import Barchart from '../components/Barchart';
import RadarChart from '../components/Radarchart';
import ScatterPlotChart from '../components/Scatterdeplot';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dash_Real_anal = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(realdata);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      auth: { token },
    });

    socket.on('realdata', (newData) => {
      setData(newData);
      console.log(newData);
    });

    socket.on('connect_error', (err) => {
      alert('Connection Error:', err.message);
      navigate('/login');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getcountrydata = (index) => {
    if (data.length > index) {
      return {
        country: data[index].country,
        population: data[index].population,
        unemployment_rate: data[index].unemployment_rate,
      };
    }
    return { country: 'N/A', population: 'N/A', unemployment_rate: 'N/A' };
  };

  return (
    <div className="w-full h-auto relative flex flex-col items-center justify-start bg-gray-100 text-gray-800">
      {/* Top country cards */}
      <Navbar />
      <div className="w-full flex flex-wrap justify-around gap-4 p-4">
        {[0, 1, 2].map((ind) => {
          const Data = getcountrydata(ind);
          return (
            <div
              key={ind}
              className="w-full sm:w-[30%] h-[10em] bg-gray-800 flex flex-col items-center justify-center p-2 rounded-md shadow-md text-white"
            >
              <h1 className="w-full text-center font-semibold text-lg">{Data.country}</h1>
              <h2 className="w-full text-center font-semibold text-sm">Population: {Data.population}</h2>
              <h2 className="w-full text-center font-semibold text-sm">Unemployment: {Data.unemployment_rate}%</h2>
            </div>
          );
        })}
      </div>

      {/* Data Table */}
      <div className="w-full sm:w-[90%] overflow-x-auto mt-4">
        <table className="w-full border-collapse border border-gray-300 text-gray-800">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Country</th>
              <th className="border border-gray-300 p-2">GDP ($)</th>
              <th className="border border-gray-300 p-2">Population</th>
              <th className="border border-gray-300 p-2">Unemployment Rate (%)</th>
              <th className="border border-gray-300 p-2">Education Expenditure (% of GDP)</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((country, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{country.country}</td>
                  <td className="border border-gray-300 p-2">
                    ${country.annual_gdp.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">{country.population}</td>
                  <td className="border border-gray-300 p-2">{country.unemployment_rate}%</td>
                  <td className="border border-gray-300 p-2">
                    {country.education_expenditure_as_percent_of_gdp}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Graphs */}
      <div className="w-full flex flex-wrap justify-between gap-4 p-4">
        <div className="w-full sm:w-[48%] h-[20em] bg-white shadow-md p-2 rounded-md">
          <LineGraph dataset={data} />
        </div>
        <div className="w-full sm:w-[48%] h-[20em] bg-white shadow-md p-2 rounded-md">
          <Barchart dataset={data} />
        </div>
        <div className="w-full sm:w-[48%] h-[20em] bg-white shadow-md p-2 rounded-md">
          <Piechart dataset={data} />
        </div>
        <div className="w-full sm:w-[48%] h-[20em] bg-white shadow-md p-2 rounded-md">
          <RadarChart dataset={data} />
        </div>
      </div>
      
      <div className="w-full sm:w-[90%] h-[30em] bg-white shadow-md p-2 rounded-md">
        <ScatterPlotChart dataset={data} />
      </div>
    </div>
  );
};

export default Dash_Real_anal;
