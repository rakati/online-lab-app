import React, { useState, useEffect, useRef } from 'react';
import { fetchUserInfo, updateProfile, changePassword } from '../services/api';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    avatar: '',
  });

  const initialUserInfo = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  // Fetch user info on load
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
        const initialUserInfo = JSON.parse(JSON.stringify(data)); // Deep copy
        console.log('Initial User Info:', initialUserInfo);
        console.log('Current User Info:', userInfo);
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
      // Create a FormData object to send only modified fields
      const formData = new FormData();
      Object.keys(userInfo).forEach((key) => {
        const backendKey = key === 'firstName' ? 'first_name' : key === 'lastName' ? 'last_name' : key;
        if (userInfo[key] !== initialUserInfo[key]) {
          if (key === 'avatar' && userInfo[key] === null) return; // Skip empty avatar
          console.log('adding data');
          formData.append(backendKey, userInfo[key]);
        }
      });

      // Make the API call
      console.log('form data: ....', {...formData});
      const response = await updateProfile(formData);
      console.log('API Response:', response);
      setMessage('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    // Validate only when the user submits
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage('All fields are required.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const payload = {
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
      };
      await changePassword(payload);
      setMessage('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage('Failed to change password.');
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setMessage('');
  };

  const handleCancelPasswordChange = () => {
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {/* Profile Info */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg mb-8">
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
          {editMode ? (
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleUpdateInfo}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
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
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword || ''}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword || ''}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword || ''}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
            >
              Change Password
            </button>
            <button
              onClick={handleCancelPasswordChange}
              className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Message */}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
