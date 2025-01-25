import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register submitted:', { username, email, password });
    // Add API register call
  };

  return (
    <div className="flex-1 bg-gray-900 text-gray-300 flex items-center justify-center p-4">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
          />
        </div>
        <button className="w-full bg-green-600 hover:bg-green-500 py-2 rounded text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
