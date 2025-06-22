import React, { useState, useEffect, useContext } from 'react';
import { getAllPatients } from '../services/patientService';
import { createBill, getBillsByPatient } from '../services/billingService';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  FileText,
  DollarSign,
  ClipboardList,
  NotebookPen,
  Plus,
} from 'lucide-react';

const BillingPage = () => {
  const { user } = useContext(AuthContext);

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [services, setServices] = useState([{ name: '', cost: '' }]);
  const [notes, setNotes] = useState('');
  const [bills, setBills] = useState([]);
  const [success, setSuccess] = useState('');

  if (!user) return <Navigate to="/" />;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients', err);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) fetchBills();
  }, [selectedPatientId]);

  const fetchBills = async () => {
    try {
      const data = await getBillsByPatient(selectedPatientId);
      setBills(data);
    } catch (err) {
      console.error('Failed to fetch bills', err);
    }
  };

  const handleAddService = () => {
    setServices([...services, { name: '', cost: '' }]);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBill({
        patientId: selectedPatientId,
        amount,
        services,
        notes,
      });
      setSuccess('✅ Bill generated successfully!');
      setAmount('');
      setServices([{ name: '', cost: '' }]);
      setNotes('');
      fetchBills();
    } catch (err) {
      alert('Failed to create bill');
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-cyan-300">
        {/* 🔖 Header */}
        <div className="flex items-center gap-2 mb-6">
          <FileText className="text-cyan-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-cyan-700">Billing Management</h1>
        </div>

        {/* 🧾 Billing Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">-- Choose a patient --</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  #{p.tokenNumber} - {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {services.map((service, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={service.cost}
                  onChange={(e) => handleServiceChange(index, 'cost', e.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
              </React.Fragment>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddService}
            className="text-sm text-cyan-600 hover:underline flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add another service
          </button>

          <div className="relative">
            <input
              type="number"
              placeholder="Total Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500"
            />
            <DollarSign className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500"
          ></textarea>

          <button
            type="submit"
            className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition font-medium"
          >
            Submit Bill
          </button>

          {success && (
            <p className="mt-2 text-green-700 bg-green-100 px-3 py-1 rounded font-medium text-sm">
              {success}
            </p>
          )}
        </form>

        {/* 📋 Billing History */}
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="w-5 h-5 text-cyan-600" />
          <h2 className="text-xl font-semibold text-gray-700">Billing History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-cyan-100 text-cyan-800">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Services</th>
                <th className="p-2 border">Notes</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill._id} className="hover:bg-cyan-50">
                  <td className="p-2 border">
                    {new Date(bill.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">₹{bill.amount}</td>
                  <td className="p-2 border">
                    <ul className="list-disc pl-4">
                      {bill.services.map((s, i) => (
                        <li key={i}>
                          {s.name} – ₹{s.cost}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border">{bill.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
