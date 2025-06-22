const Prescription = require('../models/Prescription');

// Add prescription (Doctor)
const addPrescription = async (req, res) => {
  try {
    const { patientId, diagnosis, medicines, notes } = req.body;

    const prescription = await Prescription.create({
      patient: patientId,
      doctor: req.user.id,
      diagnosis,
      medicines,
      notes
    });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add prescription' });
  }
};

// Get prescriptions by patient
const getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.id }).populate('doctor');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions' });
  }
};

module.exports = {
  addPrescription,
  getPrescriptionsByPatient
};
