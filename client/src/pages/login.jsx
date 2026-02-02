import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import '../css/account.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/users/auth/login', { email, password })
      .then((res) => {
        const data = res?.data;
        if (data?.userId) {
          localStorage.setItem('token', data.userId);
          if (data?.email) localStorage.setItem('userEmail', data.email);
        }
        window.location.href = '/home';
        setErrors({});
      })
      .catch((err) => {
        setErrors(err?.response?.data?.errors || { general: 'Login failed. Check email and password.' });
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
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!(errors && errors.password)}
                helperText={errors?.password || ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
                style={{ marginTop: '20px' }}
              />
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
