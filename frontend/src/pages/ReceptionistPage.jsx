import React, { useState, useEffect } from 'react';
import { addPatient, getAllPatients } from '../services/patientService';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import {
  UserPlus,
  Calendar,
  Phone,
  Menu,
  Users,
} from 'lucide-react';

const ReceptionistPage = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return <Navigate to="/" />;

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    try {
      const response = await addPatient(formData);
      setFormData({ name: '', age: '', contact: '' });
      setSuccess(`✅ Patient added with Token #${response.tokenNumber}`);
      fetchPatients();
    } catch (error) {
      alert('Error adding patient');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cyan-50 flex flex-col md:flex-row">
        {/* Sidebar Menu */}
        <div className="md:hidden p-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-700">
            <Menu className="w-6 h-6" />
          </button>
          {menuOpen && (
            <div className="mt-3 bg-white rounded shadow-md p-4 border border-cyan-300">
              <p className="font-semibold text-cyan-700">Receptionist Menu</p>
              <ul className="text-sm mt-2 space-y-1">
                <li className="hover:text-cyan-600 cursor-pointer">Add Patient</li>
                <li className="hover:text-cyan-600 cursor-pointer">View Billing</li>
              </ul>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-cyan-300">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-cyan-600" />
              <h1 className="text-2xl font-bold text-cyan-600">Receptionist Dashboard</h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-md pl-10 focus:ring-2 focus:ring-cyan-500"
                />
                <UserPlus className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-md pl-10 focus:ring-2 focus:ring-cyan-500"
                />
                <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-md pl-10 focus:ring-2 focus:ring-cyan-500"
                />
                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <button
                type="submit"
                className="col-span-1 md:col-span-3 bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition shadow-sm"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Patient'}
              </button>
            </form>

            {success && (
              <div className="mb-4 text-green-700 bg-green-100 px-4 py-2 rounded text-sm font-medium">
                {success}
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-700">Today's Patients</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border">
                <thead className="bg-cyan-100 text-cyan-800">
                  <tr>
                    <th className="p-2 border">Token #</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Age</th>
                    <th className="p-2 border">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id} className="hover:bg-cyan-50">
                      <td className="p-2 border">{p.tokenNumber}</td>
                      <td className="p-2 border">{p.name}</td>
                      <td className="p-2 border">{p.age}</td>
                      <td className="p-2 border">{p.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceptionistPage;
