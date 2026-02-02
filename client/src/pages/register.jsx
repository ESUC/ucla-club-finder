

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import '../css/account.css';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post('http://localhost:4000/api/users/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .then((_response) => {
        window.location.href = '/auth/login';
        setErrors({});
      })
      .catch((err) => {
        setErrors(err?.response?.data?.errors || { general: 'Registration failed. Check your input.' });
      });
  };

  return (
    <div className="login-page-wrapper">
      <NavigationBar />
      <div className="login-content-area">
        <div className="login-container">
          <h3 className="account-title">Create your account</h3>
          <h4 className="account-subtitle">
            Already have an account? <Link to="/auth/login" className="account-link">Log in</Link>
          </h4>
          <form className="account-form" onSubmit={handleRegister}>
            <div className="account-input-wrapper">
              <input
                id="firstName"
                type="text"
                value={firstName}
                className="account-input"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="account-input-wrapper">
              <input
                id="lastName"
                type="text"
                value={lastName}
                className="account-input"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <div className="account-input-wrapper">
              <input
                id="username"
                type="text"
                value={username}
                className="account-input"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="account-input-wrapper">
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!(errors && errors.email)}
                helperText={errors?.email || ''}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.5rem',
                    backgroundColor: '#F3F3F5',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    '&.Mui-focused': { backgroundColor: '#ffffff' },
                  },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d0d0d0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d0d0d0' },
                }}
              />
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
            </div>
            <div className="account-input-wrapper">
              <div className="account-password-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="account-input"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
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
            </div>
            <div className="login-remember-container">
              <label className="account-checkbox-label">
                <input type="checkbox" className="account-checkbox" />
                <span className="account-helper-text">I want to receive news on UCLA Engineering Clubs</span>
              </label>
            </div>
            <p className="account-legal-text">
              By creating an account, you agree to the 
              <Link to="/" className="account-link">Terms of Use</Link> and 
              <Link to="/" className="account-link">Privacy Policy</Link>
            </p>
            {errors?.general && (
              <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: 8 }}>{errors.general}</p>
            )}
            {(errors?.firstName || errors?.lastName || errors?.username) && (
              <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: 8 }}>
                {errors.firstName || errors.lastName || errors.username}
              </p>
            )}
            {errors?.password && (
              <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: 8 }}>{errors.password}</p>
            )}
            <button type="submit" className="account-button">Create an account</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
