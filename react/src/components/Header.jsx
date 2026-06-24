import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🍽️ CariMakan</h1>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/favorites">Favorit</a>
          <a href="/orders">Pesanan</a>

          {isAuthenticated() ? (
            <div className="auth-menu">
              <span className="user-name">Halo, {user?.nama || user?.username}!</span>
              {user?.role_id === 1 && (
                <a href="/admin" className="btn-admin">📊 Admin Panel</a>
              )}
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="auth-menu">
              <a href="/login" className="btn-login">Login</a>
              <a href="/register" className="btn-register">Daftar</a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
