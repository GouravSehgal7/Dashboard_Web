/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import gear from '../assets/gear.png';
import { useNavigate } from 'react-router-dom';
import img from "../assets/dashboard.jpg"; 

const Mainpage = () => {
  const navigate = useNavigate();
  const [hue, setHue] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTimeout(() => {
        navigate('/dashboard/graphical');
      }, 500); // Optional delay to allow any animations before navigation
    }
  }, [navigate]);

  // GSAP animation for the circle
  useEffect(() => {
    const handleMouseMove = (event) => {
      const circle = circleRef.current;
      if (circle) {
        const x = event.clientX - circle.clientWidth / 2; 
        const y = event.clientY - circle.clientHeight / 2; 

        gsap.to(circle, {
          x,
          y,
          duration: 0.3,
          ease: 'power3.out',
        });

        const newHue = (event.clientX / window.innerWidth) * 360;
        setHue(newHue);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      <div
        ref={circleRef}
        className="circle w-4 h-4 rounded-full bg-yellow-500 absolute"
        style={{ filter: `hue-rotate(${hue}deg)` }}
      />

      <header className="flex items-center justify-center h-12 p-5 bg-white shadow-md">
        <img src={gear} alt="gear" className="w-10 h-10 m-2 filter hue-rotate-60 contrast-150 brightness-200" />
      </header>

      <main className="flex flex-col-reverse md:flex-row flex-1 p-6 md:p-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
            Every task <span className="text-green-600">completed</span> brings you closer to your goals.
          </h1>
          <h3 className="text-lg sm:text-xl md:text-2xl mb-6">
            Manage your <span className="text-blue-600">projects,</span> track <span className="text-blue-600">progress</span>, and stay updated.
          </h3>

          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 z-10 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            onClick={() => navigate('/login', { replace: true })}
          >
            Get Started
          </button>
        </div>

        <div className="flex items-center justify-center flex-1 p-4">
          <img
            src={img}
            alt="Dashboard"
            className="w-full max-w-md object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </main>
    </div>
  );
};

export default Mainpage;
