const Patient = require('../models/Patient');

// Add a new patient (Receptionist)
const addPatient = async (req, res) => {
  try {
    const { name, age, contact } = req.body;

    const tokenNumber = Math.floor(1000 + Math.random() * 9000); // Random token

    const patient = await Patient.create({
      name,
      age,
      contact,
      tokenNumber,
      createdBy: req.user.id
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add patient' });
  }
};

// Get all patients (Doctor/Receptionist)
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients' });
  }
};

// Get one patient's history
const getPatientHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient' });
  }
};

module.exports = {
  addPatient,
  getAllPatients,
  getPatientHistory
};
