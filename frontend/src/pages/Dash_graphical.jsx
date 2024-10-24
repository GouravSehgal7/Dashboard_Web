/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Pie, Bar, Line, Bubble, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import gsap from 'gsap';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const Dash_graphical = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const areaChartRef = useRef(null);
  const bubbleChartRef = useRef(null);
  const scatterChartRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/realdata`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setData(result.realdata);
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

  useEffect(() => {
    if (!loading && pieChartRef.current && barChartRef.current && areaChartRef.current && bubbleChartRef.current && scatterChartRef.current) {
      // GSAP animations on page load after refs are ready
      gsap.from([pieChartRef.current, barChartRef.current, areaChartRef.current, bubbleChartRef.current, scatterChartRef.current], {
        duration: 1,
        scale: 0,
        ease: "ease-in-out",
        stagger: 0.2,
      });
    }
  }, [loading]);

  const handleMouseEnter = (e) => {
    gsap.to(e.target, { scale: 1.05, duration: 0.2 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.2 });
  };

  const countries = data.map(item => item.country);
  const unemploymentRate = data.map(item => item.unemployment_rate);

  const pieChartData = {
    labels: countries,
    datasets: [
      {
        label: 'Unemployment Rate (%)',
        data: unemploymentRate,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED'],
      },
    ],
  };

  const population = data.map(item => item.population);
  const gdp = data.map(item => item.annual_gdp);

  const barChartData = {
    labels: countries,
    datasets: [
      {
        label: 'Population',
        data: population,
        backgroundColor: '#36A2EB',
      },
      {
        label: 'GDP',
        data: gdp,
        backgroundColor: '#FFCE56',
      },
    ],
  };

  const areaChartData = {
    labels: countries,
    datasets: [
      {
        label: 'Unemployment Rate (%)',
        data: unemploymentRate,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'Population vs GDP',
        data: data.map(item => ({
          x: item.population,
          y: item.annual_gdp,
          r: item.unemployment_rate * 2,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: data.map(item => ({
          x: item.population, 
          y: item.unemployment_rate,
        })),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div className='w-full min-h-screen bg-gray-100 flex flex-col'>
      <div>       <Navbar /></div>

      <div className='grid md:grid-cols-2 gap-6'>
        <div className='p-4 rounded-lg shadow-lg bg-white'>
          <div id="unemployment_rate" className='bg-white p-4 rounded-lg shadow-md'>
            <h2 className="text-lg font-semibold mb-3">Unemployment Rate by Country</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2">Country</th>
                    <th className="border-b-2 p-2">Unemployment Rate (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{item.country}</td>
                      <td className="border-b p-2">{item.unemployment_rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='mt-6' ref={pieChartRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Unemployment Rate Distribution by Country',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className='p-4 rounded-lg shadow-lg bg-white'>
          <div className='bg-white p-4 rounded-lg shadow-md' ref={barChartRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className="text-lg font-semibold mb-3">Population and GDP by Country</h2>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Population and GDP by Country',
                  },
                },
              }}
            />
          </div>

          <div id="population" className='mt-6'>
            <h2 className="text-lg font-semibold mb-3">Country Data</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2">Country</th>
                    <th className="border-b-2 p-2">Population</th>
                    <th className="border-b-2 p-2">GDP</th>
                    <th className="border-b-2 p-2">Unemployment Rate (%)</th>
                    <th className="border-b-2 p-2">Education Expenditure (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{item.country}</td>
                      <td className="border-b p-2">{item.population}</td>
                      <td className="border-b p-2">{item.annual_gdp}</td>
                      <td className="border-b p-2">{item.unemployment_rate}</td>
                      <td className="border-b p-2">{item.education_expenditure_as_percent_of_gdp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='p-4 rounded-lg shadow-lg bg-white'>
          <div className='bg-white p-4 rounded-lg shadow-md' ref={areaChartRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className="text-lg font-semibold mb-3">Unemployment Rate Area Chart</h2>
            <Line
              data={areaChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Unemployment Rate Trend by Country',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className='p-4 rounded-lg shadow-lg bg-white'>
          <div className='bg-white p-4 rounded-lg shadow-md' ref={bubbleChartRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className="text-lg font-semibold mb-3">Bubble Chart: Population vs GDP</h2>
            <Bubble
              data={bubbleData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Bubble Chart: Population vs GDP',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className='p-4 rounded-lg w-full shadow-lg bg-white'>
          <div className='bg-white w-full p-4 rounded-lg shadow-md' ref={scatterChartRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className="text-lg font-semibold mb-3">Scatter Chart: Population vs Unemployment Rate</h2>
            <Scatter
              data={scatterData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Scatter Chart: Population vs Unemployment Rate',
                  },
                },
                scales: {
                  x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                      display: true,
                      text: 'Population',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Unemployment Rate (%)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className='p-4 rounded-lg w-full shadow-lg bg-white'>
          <div className='bg-white w-full p-4 rounded-lg shadow-md' ref={scatterChartRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2 className="text-lg font-semibold mb-3">Scatter Chart: Population vs Unemployment Rate</h2>
            <Scatter
              data={scatterData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Scatter Chart: Population vs Unemployment Rate',
                  },
                },
                scales: {
                  x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                      display: true,
                      text: 'Population',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Unemployment Rate (%)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash_graphical;
