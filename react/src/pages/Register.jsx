import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register as registerService } from '../services/authService';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await registerService(
        formData.nama,
        formData.username,
        formData.email,
        formData.password,
        formData.passwordConfirm
      );

      if (response.success) {
        // Langsung redirect ke login
        alert('Registrasi berhasil! Silakan login');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Daftar CariMakan</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password (minimal 6 karakter)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Konfirmasi Password</label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Konfirmasi password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-register">
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <p className="login-link">
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
