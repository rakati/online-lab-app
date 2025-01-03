import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await api.get('/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    // return <p>Loading profile...</p>;
    console.log('profile not loaded');
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="w-96 bg-gray-800 p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-300">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300"
            value="Current Username"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300"
            value="user@example.com"
            readOnly
          />
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-500 py-2 rounded"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
