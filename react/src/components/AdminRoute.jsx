import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Cek apakah user authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Cek apakah user adalah admin (role_id = 1)
  if (user?.role_id !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
