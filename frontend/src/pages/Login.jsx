import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('https://essence-b1fv.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      const role = user.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Useful for client-side role checks

      console.log('User role:', role);
     console.log('Navigating to dashboard...');

      // Navigate to the correct dashboard based on role
      if (role === 'stylist') {
        navigate(`/stylish-dashboard/user/${user.id}`);
      } else if (role === 'client') {
        navigate('/client-dashboard');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // fallback to home maybe
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login to Your Account</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="text-red-500 text-sm text-center">{errorMsg}</div>
          )}

          <div>
            <label className="block text-pink-700 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-pink-700">Remember me</label>
            </div>
            <a href="#" className="text-pink-500 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-pink-500 font-medium hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
