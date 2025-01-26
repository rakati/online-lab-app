import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add Authorization header to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access'); // Retrieve the access token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch user info
export const fetchUserInfo = async () => {
  const response = await api.get('/users/profile/');
  return response.data;
};

// Update profile
export const updateProfile = async (formData) => {
  const response = await api.put('/users/profile/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // Handle file uploads
  });
  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await api.post('/users/change-password/', passwordData);
  return response.data;
};

// Handle login
export const login = async (username, password) => {
  const response = await api.post('/token/', { username, password });
  return response.data;
};

// handle register
export const register = async (formData) => {
  const response = await api.post('/users/register/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // For avatar uploads
  });
  return response.data;
};

export default api;
