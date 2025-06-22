const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Patient name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  contact: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  tokenNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // receptionist who created it
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
