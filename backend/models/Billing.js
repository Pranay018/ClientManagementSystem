const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  receptionist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  services: [
    {
      name: String,
      cost: Number
    }
  ],
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Billing', billingSchema);
