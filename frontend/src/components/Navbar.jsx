/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo or Title */}
        <div className="text-2xl font-bold">
          Dashboard
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:flex-row md:space-x-4">
          <Link to="/dashboard/graphical" className="hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/dashboard/real-analysis" className="hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200">
            Live Data
          </Link>
          <Link to="/dashboard/details" className="hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200">
            Details
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
              // window.location.reload(); 
            }} 
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 p-4 transition-all duration-300`}>
        <div className="flex flex-col items-center space-y-2">
          {/* Close Button */}
          {/* <button
            onClick={toggleMenu}
            className="bg-red-500 text-white px-3 py-2 rounded transition-colors duration-200 mb-4"
          >
            Close
          </button> */}
          <Link to="/dashboard/graphical" className="hover:bg-gray-700 w-full text-center px-3 py-2 rounded transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/dashboard/real-analysis" className="hover:bg-gray-700 w-full text-center px-3 py-2 rounded transition-colors duration-200">
            Live Data
          </Link>
          <Link to="/dashboard/details" className="hover:bg-gray-700 w-full text-center px-3 py-2 rounded transition-colors duration-200">
            Details
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload(); 
            }} 
            className="bg-blue-500 hover:bg-blue-600 w-full text-center px-3 py-2 rounded transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
