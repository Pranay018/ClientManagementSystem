import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPrescriptionsByPatient } from '../services/prescriptionService';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { CalendarDays, ClipboardList, Pill, StickyNote } from 'lucide-react';

const HistoryPage = () => {
  const { id } = useParams(); // patient ID
  const { user } = useAuth();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) return <Navigate to="/" />;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPrescriptionsByPatient(id);
        setPrescriptions(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchHistory();
    }
  }, [id, user]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cyan-50 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-cyan-300">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="w-6 h-6 text-cyan-600" />
            <h1 className="text-2xl font-bold text-cyan-700">Patient History</h1>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : prescriptions.length === 0 ? (
            <p className="text-gray-500">No prescriptions found for this patient.</p>
          ) : (
            <div className="space-y-6">
              {prescriptions.map((pres) => (
                <div
                  key={pres._id}
                  className="p-4 border border-cyan-200 rounded-md shadow-sm hover:shadow-md transition"
                >
                  <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                    {new Date(pres.createdAt).toLocaleDateString()}
                  </div>

                  <p className="text-gray-800 font-semibold mb-1">
                    Diagnosis: {pres.diagnosis}
                  </p>

                  <div className="flex items-center gap-1 mb-1">
                    <Pill className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm text-cyan-700 font-semibold">
                      Prescribed Medicines:
                    </span>
                  </div>

                  <ul className="list-disc pl-6 text-sm text-gray-700">
                    {pres.medicines.map((med, i) => (
                      <li key={i}>
                        {med.name} – {med.dosage}, {med.frequency} for {med.duration}
                      </li>
                    ))}
                  </ul>

                  {pres.notes && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-gray-600 italic">
                      <StickyNote className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>Note: {pres.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
