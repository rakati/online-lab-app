import React, { useState } from 'react';

const ProfilePage = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleUpdate = () => {
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {/* Profile Info */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Update Info */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2">Update Information</h2>
        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
