import axios from 'axios';

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
  const res = await axios.post('/api/billing', data, getAuthHeader());
  return res.data;
};

// Get all bills for a patient
export const getBillsByPatient = async (patientId) => {
  const res = await axios.get(`/api/billing/${patientId}`, getAuthHeader());
  return res.data;
};
