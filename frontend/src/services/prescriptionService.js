import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
  const res = await axios.post(`${API_URL}/api/prescriptions`, data, getAuthHeader());
  return res.data;
};

// Get all prescriptions for a specific patient
export const getPrescriptionsByPatient = async (patientId) => {
  const res = await axios.get(`${API_URL}/api/prescriptions/${patientId}`, getAuthHeader());
  return res.data;
};