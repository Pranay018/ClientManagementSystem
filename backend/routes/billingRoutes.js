const express = require('express');
const router = express.Router();

const {
  createBill,
  getBillByPatient
} = require('../controllers/billingController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Routes
router.post('/', protect, authorizeRoles('receptionist'), createBill);            // Generate bill
router.get('/:id', protect, getBillByPatient);                                    // Get bills for a patient

module.exports = router;
