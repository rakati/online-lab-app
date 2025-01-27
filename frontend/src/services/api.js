import axios from 'axios';
import { convertKeysToSnakeCase, convertKeysToCamelCase } from '../utils/caseConverter';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add Authorization header to all requests
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken(); // Refresh the token
      const token = localStorage.getItem('access');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return api(originalRequest); // Retry the original request
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch user info
 */
export const fetchUserInfo = async () => {
  const response = await api.get('/users/profile/');
  return convertKeysToCamelCase(response.data);
};

/**
 * Update user profile
 */
export const updateProfile = async (formData) => {
  const convertedData = convertKeysToSnakeCase(formData);
  const response = await api.patch('/users/profile/', convertedData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return convertKeysToCamelCase(response.data);
};

/**
 * Change user password
 */
export const changePassword = async (passwordData) => {
  const convertedData = convertKeysToSnakeCase(passwordData);
  const response = await api.post('/users/change-password/', convertedData);
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

// Handle refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  const response = await api.post('/token/refresh/', { refresh });
  localStorage.setItem('access', response.data.access); // Update the access token
};

export default api;
