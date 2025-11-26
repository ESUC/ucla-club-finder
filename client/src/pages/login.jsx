import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import '../css/account.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/users/auth/login', { email, password })
      .then((response) => {
        if (response && response.status === 200) {
          window.location.href = '/home';
          console.log(response);
        } else {
          console.log('Login unsuccessful');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavigationBar />
      <div className="account-page-container">
        <div className="account-form-container">
          <Container className="account-styled-container">
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              className="account-title"
            >
              Welcome to ESUC UCLA
            </Typography>
            <Typography variant="body2" align="left" style={{ marginBottom: '20px' }}>
              Don't have an account?{' '}
              <Link to="/auth/register" className="account-link">
                Sign up
              </Link>
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="account-textfield"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="account-textfield"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
                style={{ marginTop: '20px' }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                className="account-button"
                sx={{ mt: 2, mb: 2 }}
              >
                Login
              </Button>
              <Typography align="center" sx={{ mt: 1 }}>
                {' '}
                <Link to="/auth/forgot-password" className="account-link">
                  Forgot password?
                </Link>{' '}
              </Typography>
            </form>
          </Container>
        </div>
        <div className="account-side-panel" />
      </div>
    </>
  );
};
