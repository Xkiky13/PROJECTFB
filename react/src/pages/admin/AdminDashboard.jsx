import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboard } from '../../services/adminService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      setStats(response.data);
    } catch (err) {
      setError(err.message || 'Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <p>Memuat data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-page">
        <h1>📊 Dashboard Admin</h1>
        
        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card user-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Total User</h3>
              <p className="stat-number">{stats?.totalUsers || 0}</p>
              <span className="stat-label">Pengguna terdaftar</span>
            </div>
          </div>

          <div className="stat-card food-card">
            <div className="stat-icon">🍽️</div>
            <div className="stat-content">
              <h3>Total Makanan</h3>
              <p className="stat-number">{stats?.totalFoods || 0}</p>
              <span className="stat-label">Makanan tersedia</span>
            </div>
          </div>

          <div className="stat-card order-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Total Pesanan</h3>
              <p className="stat-number">{stats?.totalOrders || 0}</p>
              <span className="stat-label">Pesanan masuk</span>
            </div>
          </div>

          <div className="stat-card favorite-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-content">
              <h3>Total Favorit</h3>
              <p className="stat-number">{stats?.totalFavorites || 0}</p>
              <span className="stat-label">Item difavoritkan</span>
            </div>
          </div>
        </div>

        <div className="dashboard-info">
          <h2>Selamat Datang di Admin Panel</h2>
          <p>Gunakan menu di sebelah kiri untuk mengelola aplikasi CariMakan</p>
          <ul className="info-list">
            <li>📊 Dashboard - Lihat statistik overview</li>
            <li>🍽️ Kelola Makanan - CRUD data makanan</li>
            <li>👥 Kelola User - Manage user dan role</li>
            <li>📦 Kelola Pesanan - Monitor semua pesanan</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
