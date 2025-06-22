const Billing = require('../models/Billing');

// Create a bill
const createBill = async (req, res) => {
  try {
    const { patientId, amount, services, notes } = req.body;

    const bill = await Billing.create({
      patient: patientId,
      receptionist: req.user.id,
      amount,
      services,
      notes
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create bill' });
  }
};

// Get bill by patient ID
const getBillByPatient = async (req, res) => {
  try {
    const bills = await Billing.find({ patient: req.params.id }).populate('patient');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills' });
  }
};

module.exports = {
  createBill,
  getBillByPatient
};
