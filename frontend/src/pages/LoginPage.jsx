import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, LogIn, Shield, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor'
  });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let data;
      if (isSignup) {
        data = await registerUser(formData);
      } else {
        data = await loginUser(formData.email, formData.password);
        if (data.role !== formData.role) {
          setError('Incorrect role selected.');
          return;
        }
      }

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate(data.role === 'doctor' ? '/doctor' : '/receptionist');
    } catch (err) {
      setError(err.response?.data?.message || (isSignup ? 'Registration failed' : 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-300 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-cyan-300">
        
        {/* 🌄 Image section (always visible) */}
        <div>
          <img
            src="https://t4.ftcdn.net/jpg/10/03/05/25/360_F_1003052586_U7T8MKyYmZL39GJuO7cKUK2xlO2NQDc7.jpg"
            alt="Clinic login"
            className="w-full h-48 sm:h-64 md:h-full object-cover"
          />
        </div>

        {/* 📝 Form section */}
        <div className="p-6 sm:p-10">
          <div className="flex justify-center mb-4">
            {isSignup ? (
              <UserPlus className="w-8 h-8 text-cyan-600" />
            ) : (
              <LogIn className="w-8 h-8 text-cyan-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-center text-cyan-700 mb-6 tracking-wide">
            {isSignup ? 'Create Account' : 'Clinic Login'}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
                />
                <UserPlus className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
              </select>
              <Shield className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition-all font-semibold shadow-md"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleMode}
              className="text-cyan-700 hover:underline font-medium transition"
            >
              {isSignup ? 'Login here' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
