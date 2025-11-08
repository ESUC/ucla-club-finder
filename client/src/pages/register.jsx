import { useState } from "react";
import { TextField, Button, Typography, Container, FormControlLabel, Checkbox, Link, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import axios from "axios";

import NavigationBar from "../components/NavigationBar";


const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #F5F8FF;
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
  box-shadow: 0 10px 30px rgba(4,56,115,0.08);
  border: 1px solid #E6EEF9;
`;

const SidePanel = styled.div`
  flex: 1;
  background: #043873;
`;

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleRegister = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/api/users/auth/register', { email, password, firstName, lastName })
    .then(response => {
      if (response && response.status === 200) {
        window.location.href = '/auth/login';
        console.log(response);
      } else {
        console.log('Registration unsuccessful');
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
            <Typography variant="h5" align="left" gutterBottom sx={{ color: "#043873", fontWeight: 700 }}>
              Create your account
            </Typography>
            <Typography variant="body2" align="left" sx={{marginBottom: "20px"}}>
              Already have an account? <Link href="/auth/login" style={{ color: "#4F9CF9", textDecorationColor: "#A7CEFC" }}>Log in</Link>
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
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                sx={{marginTop: "20px"}}
              />
              <Typography variant="body2" align="left" sx={{marginTop: "20px"}}>
                By creating an account, you agree to the <Link href="/" style={{ color: "#4F9CF9" }}>Terms of use</Link> and <Link href="/" style={{ color: "#4F9CF9" }}>Privacy Policy</Link>
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
                    boxShadow: '0 12px 24px rgba(79,156,249,0.45)'
                  }
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


