import { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment } from '@mui/material';
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePassword = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:4000/api/users/auth/forgot-password', { email })
    //   .then((response) => {
    //     if (response && response.status === 200) {
    //       window.location.href = '/auth/verify-password';
    //       console.log(response);
    //     } else {
    //       console.log('Unsuccessful');
    //     }
    //   })
    //   .catch((err) => console.log(err));
    console.log('trigger');
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
              Forgot Password
            </Typography>
            <Typography variant="body2" align="left" style={{ marginBottom: '20px' }}>
              Enter your email address and we'll send you a code to reset your password.{' '}
              <Link to="/auth/login" style={{ color: '#4F9CF9', textDecorationColor: '#A7CEFC' }}>
                Back to login
              </Link>
            </Typography>
            <form onSubmit={handlePassword}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
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
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  mb: 2,
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
                Send Code
              </Button>
            </form>
          </StyledContainer>
        </FormContainer>
        <SidePanel />
      </PageContainer>
    </>
  );
};
