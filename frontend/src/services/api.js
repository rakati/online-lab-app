import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const login = async (username, password) => {
  const response = await api.post('/token/', { username, password });
  return response.data;
};

export default api;
