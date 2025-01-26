import React, { useState, useEffect } from 'react';
import { fetchUserInfo, updateProfile, changePassword } from '../services/api';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    avatar: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  // Fetch user info on page load
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        setMessage('Failed to load user information.');
      }
    };

    loadUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleUpdateInfo = async () => {
    try {
      const formData = new FormData();
      for (const key in userInfo) {
        formData.append(key, userInfo[key]);
      }
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    try {
      await changePassword(passwordData);
      setMessage('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage('Failed to change password.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Image and Info */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg">
        <div className="flex items-center mb-4">
          <img
            src={userInfo.avatar || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-4 border border-gray-300 dark:border-gray-700"
          />
          <label className="cursor-pointer text-blue-500 hover:underline">
            <input
              type="file"
              name="avatar"
              className="hidden"
              onChange={(e) => setUserInfo({ ...userInfo, avatar: e.target.files[0] })}
            />
            Upload
          </label>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          {['username', 'email', 'firstName', 'lastName', 'birthday'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'birthday' ? 'date' : 'text'}
                name={field}
                value={userInfo[field]}
                disabled={!editMode}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded ${
                  editMode
                    ? 'bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
                    : 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Update Info Button */}
        {editMode ? (
          <button
            onClick={handleUpdateInfo}
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Password Change */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
        <button
          onClick={handleChangePassword}
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
        >
          Change Password
        </button>
      </div>

      {/* Message */}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default ProfilePage;
