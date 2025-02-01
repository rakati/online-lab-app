import axios from 'axios';
import { store } from '../store'; // or wherever your store is
import { setLogout } from '../store/userSlice';
import { convertKeysToSnakeCase, convertKeysToCamelCase } from '../utils/caseConverter';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status } = error.response || {};

    // 1) If 401 and not yet retried
    if (
      status === 401 &&
      !originalRequest._retry &&
      // 2) skip if it's already the refresh or login request
      !originalRequest.url.includes('/token/') &&
      // (and maybe skip '/users/register/' if you want)
      !originalRequest.url.includes('/register')
    ) {
      originalRequest._retry = true;
      try {
        // attempt refresh
        await refreshToken();
        // set the header from localStorage
        const access = localStorage.getItem('access');
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        // retry the original
        return api(originalRequest);
      } catch (err) {
        // If refresh fails => log out
        store.dispatch(setLogout());
        return Promise.reject(err);
      }
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
  const convertedData = convertKeysToSnakeCase(formData);
  const response = await axios.post('http://localhost:8000/api/users/register/', convertedData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return convertKeysToCamelCase(response.data);
};
// Handle refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) {
    throw new Error('No refresh token available');
  }
  const response = await api.post('/token/refresh/', { refresh });
  localStorage.setItem('access', response.data.access);
  return response.data.access;
};

export default api;
