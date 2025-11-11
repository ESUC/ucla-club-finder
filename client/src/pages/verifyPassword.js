import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  makeStyles,
} from "@mui/material";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NavigationBar from "../components/NavigationBar.js";
import axios from "axios";


const OuterContainer = styled.div`
  background: white;
  background: linear-gradient(to right bottom, #ffc400, #00d2ff);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;


export const Password = () => {
  const [password, setPassword] = useState();
  const [newPassword, setConfirmed] = useState();
  const [code, setCode] = useState();

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
              sx={{ mt: 3, mb: 2, background: "white", background: "#00A7FF" }}
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
