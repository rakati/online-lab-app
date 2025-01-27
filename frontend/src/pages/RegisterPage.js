import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    birthday: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Frontend validation for required fields
    if (!formData.username || !formData.password || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return;
    }


    try {
      await register(formData);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error(err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="bg-gray-100 dark:bg-gray-800 p-8 border-theme shadow-theme rounded shadow-md w-96">
        <h2 className="text-2xl text-black dark:text-white font-bold mb-4">Register</h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">Password <span className="text-red-500">*</span></label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Birthday */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">Birthday</label>
          <input
            type="date"
            name="birthday"
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.birthday}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded">
          Register
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
