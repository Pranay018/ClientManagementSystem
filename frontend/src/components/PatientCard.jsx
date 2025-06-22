import React from 'react';
import { Link } from 'react-router-dom';
import { Hash, Calendar, Phone } from 'lucide-react';

const PatientCard = ({
  patient,
  showHistory = false,
  showAction = false,
  onActionClick,
  actionLabel,
}) => {
  return (
    <div className="bg-white border border-cyan-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div className="mb-3 space-y-1">
        <h3 className="text-lg font-semibold text-cyan-700 flex items-center gap-2">
          <Hash className="w-4 h-4 text-cyan-500" />
          Token #{patient.tokenNumber} – {patient.name}
        </h3>

        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          Age: {patient.age}
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          Contact: {patient.contact}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        {showHistory && (
          <Link
            to={`/history/${patient._id}`}
            className="text-sm text-cyan-600 hover:text-cyan-800 font-medium transition"
          >
            View History
          </Link>
        )}

        {showAction && (
          <button
            onClick={() => onActionClick(patient)}
            className="text-sm bg-cyan-500 text-white px-4 py-1.5 rounded-md hover:bg-cyan-600 transition font-medium"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
