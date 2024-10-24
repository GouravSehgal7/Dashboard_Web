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
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-auto min-h-screen bg-gradient-to-t from-gray-900 to-gray-800 md:bg-[conic-gradient(at_top_right,_#ffff,_#ffff,_#2b3f5b,_#0a0a0a)]">
          <div
            ref={circleRef} // Attach the ref to the circle element
            className="circle w-4 h-4 rounded-full bg-yellow-500 absolute"
            style={{
              filter: `hue-rotate(${hue}deg)`,
            }}
          />

          <div className="w-full h-12 p-5 flex items-center justify-center">
            <img
              src={gear}
              alt="gear"
              className="w-10 h-10 m-2 filter hue-rotate-60 contrast-150 brightness-200"
            />
          </div>

          <div className="w-full flex flex-wrap flex-col-reverse md:flex-row h-full md:h-screen">
            <div className="p-6 md:p-10 h-full w-full md:w-[50%] text-white flex flex-col items-center justify-center text-center md:text-left">
              <h1 className="p-2 text-2xl sm:text-3xl md:text-5xl font-extrabold">
                Every task <span className="text-green-300">completed</span> brings you closer to your goals.
              </h1>
              <h3 className="p-2 text-lg sm:text-xl md:text-2xl mt-4">
                Manage your <span className="text-blue-300">projects,</span> track <span className="text-blue-300">progress</span>, and stay updated.
              </h3>

              {/* Button Section */}
              <div className="mt-6 md:mt-8 z-10">
                <button
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300"
                  onClick={() => {
                    navigate('/login', { replace: true });
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="h-auto w-full md:w-[50%] flex items-center justify-center md:h-full p-4">
              <img
                src={img}
                alt="Dashboard"
                className="w-[70%] h-auto max-w-sm md:max-w-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
