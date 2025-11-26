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
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import '../css/account.css';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/users/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password,
        major,
        year,
      })
      .then((response) => {
        if (response && response.status === 200) {
          window.location.href = '/auth/login';
          console.log(response);
        } else {
          console.log('Registration unsuccessful');
        }
      })
      .catch((err) => {
        console.error('Registration error:', err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          alert('Registration failed. Please check your input and try again.');
        }
      });
  };

  return (
    <>
      <NavigationBar />
      <div className="account-page-container">
        <div className="account-form-container-white">
          <Container className="account-styled-container">
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              className="account-title"
            >
              Create your account
            </Typography>
            <Typography variant="body2" align="left" sx={{ marginBottom: '20px' }}>
              Already have an account?{' '}
              <Link to="/auth/login" className="account-link">
                Log in
              </Link>
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                margin="normal"
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="account-textfield"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="account-textfield"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="account-textfield"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="account-textfield"
              />
              <FormHelperText className="account-helper-text">
                Must be a valid UCLA email (@ucla.edu or @g.ucla.edu)
              </FormHelperText>
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
              <FormHelperText className="account-helper-text">
                Password must be at least 12 characters with uppercase, lowercase, number, and special character (@ $ ! % * ? &)
              </FormHelperText>
              <TextField
                fullWidth
                margin="normal"
                label="Major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="account-textfield"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Graduation Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="account-textfield"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I want to receive news on the newest UCLA Engineering Clubs"
                sx={{ marginTop: '20px' }}
              />
              <Typography variant="body2" align="left" sx={{ marginTop: '20px' }}>
                By creating an account, you agree to the{' '}
                <Link to="/" className="account-link">
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link to="/" className="account-link">
                  Privacy Policy
                </Link>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                className="account-button"
                sx={{ mt: 2 }}
              >
                Create an account
              </Button>
            </form>
          </Container>
        </div>
        <div className="account-side-panel" />
      </div>
    </>
  );
};
