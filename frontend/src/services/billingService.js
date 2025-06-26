import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// Create a new bill
export const createBill = async (data) => {
  const res = await axios.post(`${API_URL}/api/billing`, data, getAuthHeader());
  return res.data;
};

// Get all bills for a patient
export const getBillsByPatient = async (patientId) => {
  const res = await axios.get(`${API_URL}/api/billing/${patientId}`, getAuthHeader());
  return res.data;
};