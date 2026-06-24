import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
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
      const response = await loginService(
        formData.emailOrUsername,
        formData.password
      );

      if (response.success) {
        // Simpan token dan user ke context dan localStorage
        login(response.token, response.user);
        // Redirect ke home
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login CariMakan</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email atau Username</label>
            <input
              id="emailOrUsername"
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Masukkan email atau username"
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
              placeholder="Masukkan password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? 'Login...' : 'Login'}
          </button>
        </form>

        <p className="register-link">
          Belum punya akun? <a href="/register">Daftar di sini</a>
        </p>

        <div className="demo-info">
          <p><strong>Demo Account:</strong></p>
          <p>Email: demo@carimakan.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
