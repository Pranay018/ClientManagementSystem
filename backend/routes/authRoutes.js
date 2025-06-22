const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Public routes
router.post('/register', register); // for receptionist/doctor creation
router.post('/login', login);       // login

module.exports = router;
