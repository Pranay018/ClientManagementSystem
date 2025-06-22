const express = require('express');
const router = express.Router();

const {
  addPrescription,
  getPrescriptionsByPatient
} = require('../controllers/prescriptionController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Routes
router.post('/', protect, authorizeRoles('doctor'), addPrescription);             // Add prescription
router.get('/:id', protect, getPrescriptionsByPatient);                           // Get prescriptions for a patient

module.exports = router;
