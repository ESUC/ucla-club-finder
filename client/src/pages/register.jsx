

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
import styled from 'styled-components';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #f5f8ff;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 40px 16px;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  max-width: 560px;
  padding: 32px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(4, 56, 115, 0.08);
  border: 1px solid #e6eef9;
`;

const SidePanel = styled.div`
  flex: 1;
  background: #043873;
`;

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');

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
        major,
        year,
      })
      .then((response) => {
        window.location.href = '/auth/login';
        setError(''); // clear error

      })
      .catch((err) => {
        setErrors(err?.response?.data?.errors || { general: 'Registration failed' });
      });
  };

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <FormContainer>
          <StyledContainer>
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              sx={{ color: '#043873', fontWeight: 700 }}
            >
              Create your account
            </Typography>
            <Typography variant="body2" align="left" sx={{ marginBottom: '20px' }}>
              Already have an account?{' '}
              <Link
                to="/auth/login"
                style={{ color: '#4F9CF9', textDecorationColor: '#A7CEFC', textDecoration: 'none' }}
              >
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
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password || ''}
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
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Graduation Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                error = {!!errors.year}
                helperText = {errors.year || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I want to receive news on the newest UCLA Engineering Clubs"
                sx={{ marginTop: '20px' }}
              />
              <Typography variant="body2" align="left" sx={{ marginTop: '20px' }}>
                By creating an account, you agree to the{' '}
                <Link to="/" style={{ color: '#4F9CF9', textDecoration: 'none' }}>
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link to="/" style={{ color: '#4F9CF9', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  height: 54,
                  background: '#043873',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: '.2px',
                  boxShadow: '0 10px 20px rgba(79,156,249,0.35)',
                  '&:hover': {
                    background: '#062E63',
                    boxShadow: '0 12px 24px rgba(79,156,249,0.45)',
                  },
                }}
              >
                Create an account
              </Button>
            </form>
          </StyledContainer>
        </FormContainer>
        <SidePanel />
      </PageContainer>
    </>
  );
};
