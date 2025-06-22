import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Optional: show loading UI while checking auth
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50 text-cyan-600 text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
};

export default PrivateRoute;
