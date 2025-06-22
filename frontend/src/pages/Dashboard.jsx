import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      if (user.role === 'doctor') {
        navigate('/doctor');
      } else if (user.role === 'receptionist') {
        navigate('/receptionist');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-cyan-100">
      <div className="text-center">
        <p className="text-xl text-cyan-700 font-semibold">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default Dashboard;
