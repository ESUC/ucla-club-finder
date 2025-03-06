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
  List,
  ListItem,
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
  /*box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);*/
`;

const BackgroundContainer = styled.div`
  flex: 1;
  background: linear-gradient(to right, #002855, #00ff99);
`;

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/users/signup", { email, username, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <FormContainer>
          <StyledContainer>
            <Typography variant="h5" align="left" gutterBottom>
              Welcome to ESUC UCLA
            </Typography>
            <Typography variant="body2" align="left" sx={{marginBottom: "20px"}}>
              Already have an account? <Link href="/auth/login">Log in</Link>
            </Typography>
            <form onSubmit={handleSignup}>
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
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
             {/*} <List dense>
                <ListItem>• Use 8 or more characters</ListItem>
                <ListItem>• One uppercase character</ListItem>
                <ListItem>• One lowercase character</ListItem>
                <ListItem>• One special character</ListItem>
                <ListItem>• One number</ListItem>
              </List>*/}
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I want to receive news on the newest UCLA Engineering Clubs"
                sx={{marginTop: "20px"}}
              />
              <Typography variant="body2" align="left" sx={{marginTop: "20px"}}>
                By creating an account, you agree to the <Link href="/">Terms of use</Link> and <Link href="/">Privacy Policy</Link>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2, background: "#ccc", color: "black", borderRadius: "15px" }}
              >
                Create an account
              </Button>
            </form>
          </StyledContainer>
        </FormContainer>
        <BackgroundContainer />
      </PageContainer>
    </>
  );
};