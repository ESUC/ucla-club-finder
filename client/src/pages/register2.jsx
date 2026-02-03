

import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';

const OuterContainer = styled.div`
  background: white;
  background: linear-gradient(to right bottom, #ffc400, #00d2ff);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

export const Register = () => {
  console.log("REGISTER PAGE 2 RENDER");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [major, setMajor] = useState();
  const [year, setYear] = useState();
  const [username, setUsername] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/users/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password,
        year,
        major,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavigationBar />
      <OuterContainer>
        <Container
          maxWidth="xs"
          sx={{
            height: '80vh',
            borderRadius: 4,
            padding: '50px',
            background: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px black',
          }}
        >
          <Typography variant="h5" align="center" sx={{ color: 'black' }}>
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              fullWidth
              id="major"
              label="Major"
              name="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />

            <TextField
              margin="normal"
              fullWidth
              id="year"
              label="Graduation Year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: '#00A7FF' }}
              onClick={handleRegister}
            >
              SUBMIT
            </Button>
          </Box>
        </Container>
      </OuterContainer>
    </>
  );
};
