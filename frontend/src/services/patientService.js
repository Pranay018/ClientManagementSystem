import axios from 'axios';

// Utility: get Authorization header
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?.token) {
    throw new Error('No token found');
  }
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

// Add a new patient
export const addPatient = async (data) => {
  const res = await axios.post('/api/patients', data, getAuthHeader());
  return res.data;
};

// Get all patients (for dashboard, listing)
export const getAllPatients = async () => {
  const res = await axios.get('/api/patients', getAuthHeader());
  return res.data;
};

// Get specific patient history (used in HistoryPage)
export const getPatientHistory = async (id) => {
  const res = await axios.get(`/api/patients/${id}/history`, getAuthHeader());
  return res.data;
};
