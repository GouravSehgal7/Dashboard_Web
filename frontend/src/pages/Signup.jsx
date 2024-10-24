/* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard/graphical', { replace: true });
    }
  }, [navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before submitting

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, 
      { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard/graphical');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed! Please try again.';
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="mb-4 text-red-500" role="alert">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              className="w-full p-2 text-gray-900 bg-gray-200 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 text-gray-900 bg-gray-200 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 text-gray-900 bg-gray-200 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 text-gray-900 bg-gray-200 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </p>
        {/* <p>{import.meta.env.VITE_BACKEND_URL}</p> */}
      </div>
    </div>
  );
};

export default Signup;
