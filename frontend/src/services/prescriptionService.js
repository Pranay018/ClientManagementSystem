import axios from 'axios';

// Auth header helper
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// Add a new prescription
export const addPrescription = async (data) => {
  const res = await axios.post('/api/prescriptions', data, getAuthHeader());
  return res.data;
};

// Get all prescriptions for a specific patient
export const getPrescriptionsByPatient = async (patientId) => {
  const res = await axios.get(`/api/prescriptions/${patientId}`, getAuthHeader());
  return res.data;
};
