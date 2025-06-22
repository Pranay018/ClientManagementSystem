const express = require('express');
const router = express.Router();

const {
  addPatient,
  getAllPatients,
  getPatientHistory
} = require('../controllers/patientController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Routes
router.post('/', protect, authorizeRoles('receptionist'), addPatient);     // Add patient
router.get('/', protect, getAllPatients);                                  // All patients (doctor/receptionist)
router.get('/:id/history', protect, getPatientHistory);                    // Single patient's history

module.exports = router;
