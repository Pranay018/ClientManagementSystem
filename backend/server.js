// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const logger = require('./middleware/logger');

// Load environment variables from .env
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const billingRoutes = require('./routes/billingRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Create Express app
const app = express();

// Middleware
app.use(cors({
origin:'http://localhost:5000',
credentials: true 
}));
app.use(express.json());
app.use(morgan('dev')); // Logs requests
app.use(logger);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Stop server if DB fails
});

// Base route
app.get('/', (req, res) => {
  res.send('🚀 Clinic Management API is running...');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/billing', billingRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
