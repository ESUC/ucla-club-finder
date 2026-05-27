import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import '../css/account.css';
import { API_BASE } from '../config';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});
    axios
      .post(`${API_BASE}/api/users/auth/login`, { email, password })
      .then((res) => {
        const data = res?.data;
        if (data?.userId) {
          localStorage.setItem('token', data.userId);
          if (data?.email) localStorage.setItem('userEmail', data.email);
        }
        window.location.href = '/home';
      })
      .catch((err) => {
        const data = err?.response?.data;
        const apiErrors = data?.errors;
        const isObj = apiErrors && typeof apiErrors === 'object' && !Array.isArray(apiErrors);
        const general = data?.error || (isObj ? apiErrors.general : null);
        setErrors(isObj ? { ...apiErrors, ...(general ? { general } : {}) } : { general: general || 'Login failed. Please check your email and password.' });
      });
  };

  return (
    <div className="login-page-wrapper">
      <NavigationBar />
      <div className="login-content-area">
        <div className="login-container">
          <h3 className="account-title">Welcome to ESUC UCLA</h3>
          <h4 className="account-subtitle">Don't have an account? <Link to="/auth/register" className="account-link">Sign up</Link></h4>
          <form className="account-form" onSubmit={handleLogin}>
            <div className="account-input-wrapper">
              <input
                id="email"
                type="email"
                value={email}
                className="account-input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {errors?.email && (
                <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: 8 }}>{errors.email}</p>
              )}
            </div>
            <div className="account-input-wrapper">
              <div className="account-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="account-input"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {errors?.password && (
                <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: 8 }}>{errors.password}</p>
              )}
            </div>
            {errors?.general && (
              <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: 8 }}>{errors.general}</p>
            )}
            <button type="submit" className="account-button">Login</button>
            <Link to="/auth/forgot-password" className="account-forgot">Forgot password?</Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
