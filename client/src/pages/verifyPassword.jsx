import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, InputAdornment } from '@mui/material';
import { LockOpen as LockOpenIcon } from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar';


const OuterContainer = styled.div`
  background: white;
  background: linear-gradient(to right bottom, #ffc400, #00d2ff);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;


export const VerifyPassword = () => {
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [newPassword, setConfirmed] = useState('');
  const [code, setCode] = useState('');

  const handlePassword = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/api/users/auth/verify-password', {code, password})
    .then(response => {
      if (response && response.status === 200) {
        window.location.href = '/auth/login';
        console.log(response);
      } else {
        console.log('Reset password unsuccessful');
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <NavigationBar />
      <OuterContainer>
        <Container
          maxWidth="xs"
          sx={{
            height: "80vh",
            borderRadius: 4,
            padding: "50px",
            background: "white",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 8px black",
          }}
        >
          <Typography variant="h5" align="center" sx={{ color: "black" }}>
            FORGOT PASSWORD
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="Code"
              id="code"
              autoComplete="code"
              onChange={(e) => setCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              id="new-password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              id="confirmed-password"
              autoComplete="confirmed-password"
              onChange={(e) => setConfirmed(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: '#00A7FF' }}
              onClick={handlePassword}
            >
              Reset Password
            </Button>
          </Box>
        </Container>
      </OuterContainer>
    </>
  );
};
