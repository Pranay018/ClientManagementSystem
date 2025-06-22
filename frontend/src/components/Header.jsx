import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  LayoutDashboard,
  Stethoscope,
  Building2,
  CreditCard,
  User,
} from 'lucide-react';

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <header className="bg-cyan-500 text-white px-6 py-3 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      {/* 🏥 Logo + Role */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Building2 className="w-6 h-6" />
        <span>
          Clinic System – <span className="capitalize">{user.role}</span>
        </span>
      </div>

      {/* 🧭 Navigation + Actions */}
      <div className="flex items-center gap-6">
        <nav className="flex gap-4 text-sm font-medium items-center">
          <Link to="/dashboard" className="hover:text-cyan-100 flex items-center gap-1">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          {user.role === 'receptionist' && (
            <>
              <Link to="/receptionist" className="hover:text-cyan-100 flex items-center gap-1">
                <User className="w-4 h-4" />
                Reception
              </Link>
              <Link to="/billing" className="hover:text-cyan-100 flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                Billing
              </Link>
            </>
          )}

          {user.role === 'doctor' && (
            <Link to="/doctor" className="hover:text-cyan-100 flex items-center gap-1">
              <Stethoscope className="w-4 h-4" />
              Doctor
            </Link>
          )}
        </nav>

        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span>
            Logged in as <strong>{user.name}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-white text-cyan-600 px-3 py-1 rounded hover:bg-cyan-100 font-medium transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

