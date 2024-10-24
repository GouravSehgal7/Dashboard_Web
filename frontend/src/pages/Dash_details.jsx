/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from "../components/Navbar";

const Dash_details = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  const [selectedYear, setSelectedYear] = useState();
  const [selectedCountry, setSelectedCountry] = useState('');

  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/country`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching the data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const uniqueYears = [...new Set(data.map(item => item.year))];
  const uniqueCountries = [...new Set(data.map(item => item.country))];

  const filteredData = data.filter(item => {
    const matchesYear = selectedYear ? item.year === Number(selectedYear) : true;
    const matchesCountry = selectedCountry ? item.country === selectedCountry : true;
    return matchesYear && matchesCountry;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
     <Navbar/>
     <div className='w-full h-screen bg-gray-100'> {/* Light background for entire content */}
     
      <div className='w-full h-auto bg-white shadow-md overflow-auto p-4'>
        <div className='flex flex-col md:flex-row items-center justify-between pb-2 pt-0'>
          <h1 className='text-2xl font-bold mb-4 text-gray-900'>Country Data Table</h1>
        </div>

        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4'>
          <select 
            value={selectedYear} 
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className='px-4 py-2 rounded bg-gray-200 text-gray-900 w-full md:w-auto'
          >
            <option value=''>Select Year</option>
            {uniqueYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={selectedCountry} 
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
            className='px-4 py-2 rounded bg-gray-200 text-gray-900 w-full md:w-auto'
          >
            <option value=''>Select Country</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className='min-w-full bg-gray-900 border border-gray-700'> {/* Bold dark color for table */}
            <thead className='bg-black'>
              <tr>
                {['Year', 'Country', 'Annual GDP', 'Population', 'Inflation', 'Unemployment', 'Life Expectancy', 'Debt to GDP', 'Education', 'Emissions', 'Median Age'].map(header => (
                  <th key={header} className='py-2 px-4 border-b text-white border-gray-600 text-xs sm:text-sm'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className='hover:bg-gray-700'>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.year}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.country}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.annual_gdp}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.population}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.inflation_rate}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.unemployment_rate}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.life_expectancy}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.government_debt_to_gdp_ratio}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.education_expenditure_as_percent_of_gdp}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.carbon_emissions_per_capita}</td>
                  <td className='py-2 px-4 border-b border-gray-600 text-white text-xs sm:text-sm'>{item.median_age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Previous
          </button>
          <span className='text-gray-900'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dash_details;
