import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (username, password) => {
  const response = await api.post('/token/', { username, password });
  return response.data;
};

export default api;
