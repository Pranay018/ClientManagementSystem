import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DoctorPage from './pages/DoctorPage.jsx';
import ReceptionistPage from './pages/ReceptionistPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import BillingPage from './pages/BillingPage.jsx';

// Context and Routing
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />

          {/* Redirect logic */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          {/* Doctor-specific */}
          <Route path="/doctor" element={<PrivateRoute><DoctorPage /></PrivateRoute>} />

          {/* Receptionist-specific */}
          <Route path="/receptionist" element={<PrivateRoute><ReceptionistPage /></PrivateRoute>} />
          <Route path="/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />

          {/* Common */}
          <Route path="/history/:id" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />

          {/* Fallback (Optional 404 page) */}
          <Route path="*" element={<div className="p-6 text-center text-red-600 text-xl">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
