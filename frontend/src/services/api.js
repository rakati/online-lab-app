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

export const login = async (username, password) => {
  const response = await api.post('/token/', { username, password });
  return response.data;
};

export default api;
