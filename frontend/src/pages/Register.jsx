import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://essence-b1fv.onrender.com/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Create Your Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-pink-700 font-medium mb-1" htmlFor="username">
            Username
            </label>
            <input
              type="text"
              id="userame"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Register
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-pink-600">{message}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-pink-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
