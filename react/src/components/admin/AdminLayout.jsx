import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🔐 Admin Panel</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin')}`}
          >
            <span className="icon">📊</span>
            Dashboard
          </Link>
          
          <Link 
            to="/admin/foods" 
            className={`nav-item ${isActive('/admin/foods')}`}
          >
            <span className="icon">🍽️</span>
            Kelola Makanan
          </Link>
          
          <Link 
            to="/admin/users" 
            className={`nav-item ${isActive('/admin/users')}`}
          >
            <span className="icon">👥</span>
            Kelola User
          </Link>
          
          <Link 
            to="/admin/orders" 
            className={`nav-item ${isActive('/admin/orders')}`}
          >
            <span className="icon">📦</span>
            Kelola Pesanan
          </Link>

          <hr />

          <Link 
            to="/" 
            className="nav-item back-home"
          >
            <span className="icon">🏠</span>
            Kembali ke Home
          </Link>
        </nav>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
