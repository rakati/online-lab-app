import React, { useState } from 'react';
import { login } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      alert('Login successful!');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Username</label>
          <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300"
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
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
