import axios from 'axios';

// Set base URL if needed
// axios.defaults.baseURL = 'http://localhost:5000';
//  // Uncomment and set your backend URL if required

// Login user
export const loginUser = async (email, password) => {
  const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
  return res.data; // { _id, name, email, role, token }
};

// Optional: Register user
export const registerUser = async (userData) => {
  const res = await axios.post('/api/auth/register', userData, { withCredentials: true });
  return res.data;
};

