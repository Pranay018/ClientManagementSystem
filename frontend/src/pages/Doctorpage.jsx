import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../services/patientService';
import { addPrescription } from '../services/prescriptionService';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import {
  Stethoscope,
  User,
  FileText,
  PlusCircle,
  Pill,
} from 'lucide-react';

const DoctorPage = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '', duration: '' },
  ]);
  const [success, setSuccess] = useState('');

  if (!user) return <Navigate to="/" />;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    };

    if (user?.token) {
      fetchPatients();
    }
  }, [user]);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !diagnosis || medicines.length === 0) return;

    try {
      await addPrescription({ patientId: selectedPatientId, diagnosis, medicines });
      setDiagnosis('');
      setMedicines([{ name: '', dosage: '', frequency: '', duration: '' }]);
      setSuccess('✅ Prescription submitted successfully.');
    } catch (error) {
      alert('Error submitting prescription');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-6 bg-cyan-50">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-cyan-300">
          <div className="flex items-center gap-2 mb-6">
            <Stethoscope className="text-cyan-600 w-6 h-6" />
            <h1 className="text-2xl font-bold text-cyan-700">Doctor Dashboard</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Patient */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <User className="w-4 h-4 text-gray-400" />
                Select Patient
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">-- Choose a patient --</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    #{patient.tokenNumber} - {patient.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4 text-gray-400" />
                Diagnosis
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Viral Fever"
              />
            </div>

            {/* Medicines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Pill className="w-4 h-4 text-gray-400" />
                Medicines
              </label>

              {medicines.map((med, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Frequency"
                    value={med.frequency}
                    onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddMedicine}
                className="text-sm text-cyan-600 mt-1 hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                Add another medicine
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition font-medium"
            >
              Submit Prescription
            </button>

            {/* Success Message */}
            {success && (
              <div className="mt-3 bg-green-100 text-green-700 px-4 py-2 rounded text-sm font-medium">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorPage;
