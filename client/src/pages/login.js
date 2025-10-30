import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NavigationBar from "../components/NavigationBar.js";
import styled from "styled-components";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 40px;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  padding: 40px;
  border-radius: 8px;
`;

const BackgroundContainer = styled.div`
  flex: 1;
  background: linear-gradient(to right, #002855, #00ff99);
`;


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/api/users/auth/login', {email, password})
    .then(response => {
      if (response && response.status === 200) {
        window.location.href = '/home';
        console.log(response);
      } else {
        console.log('Login unsuccessful');
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <FormContainer>
          <StyledContainer>
            <Typography variant="h5" align="left" gutterBottom>
              Welcome to ESUC UCLA
            </Typography>
            <Typography variant="body2" align="left" sx={{ marginBottom: "20px" }}>
              Don't have an account? <Link href="/signup">Sign up</Link>
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                sx={{ marginTop: "20px" }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2, background: "#ccc", color: "black", borderRadius: "15px", marginBottom: "20px"}}
              >
                Login
              </Button>
              <Typography align="center"> <Link href="#" sx={{width: "100%"}}>Forgot password?</Link> </Typography>
                {/*<Grid item>
                  <Typography> 
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                  </Typography>
                </Grid>*/}
            </form>
          </StyledContainer>
        </FormContainer>
        <BackgroundContainer />
      </PageContainer>
    </>
  );
};
