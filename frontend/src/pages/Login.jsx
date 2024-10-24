/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, replace, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard/graphical',{replace:true})
    }
  }, [navigate]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json', // Set content type
        },
      });
      const { token } = response.data;
      console.log('Login successful:', response.data);
      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
        navigate('/dashboard/graphical');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 text-gray-900 bg-gray-200 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 text-gray-900 bg-gray-200 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Do not have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
