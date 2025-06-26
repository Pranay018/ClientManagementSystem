import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/api/auth/register`, userData, { withCredentials: true });
  return res.data;
};