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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [code, setCode] = useState();

  const handlePassword = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/api/users/auth/forgot-password', {email})
    .then(response => {
      if (response && response.status === 200) {
        window.location.href = '/auth/verify-password';
        console.log(response);
      } else {
        console.log('Unsuccessful');
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
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
              Send Code
            </Button>
          </Box>
        </Container>
      </OuterContainer>
    </>
  );
};
