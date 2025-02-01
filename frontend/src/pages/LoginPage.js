import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../store/userSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  // Determine where to redirect after login
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { access, refresh } = await login(username, password);
      dispatch(setLogin({
        accessToken: access,
        refreshToken: refresh,
      }));
      setError('');
      navigate(from, { replace: true }); // Redirect to the requested page or fallback to "/"
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-100 dark:bg-gray-800 p-8  border-theme shadow-theme rounded shadow-md w-96">
        <h2 className="text-2xl text-black dark:text-white font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">Username</label>
          <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </form>

    </div>
  );
};

export default LoginPage;
