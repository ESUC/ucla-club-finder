import { useState } from "react";
import { TextField, Button, Typography, Container, InputAdornment } from "@mui/material";
import { PersonOutline as PersonOutlineIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import NavigationBar from "../components/NavigationBar";

const API_BASE = "http://localhost:4000/api/userAuth";

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
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      await axios.post(`${API_BASE}/auth/forgot-password`, { email });

      // Store email for next steps so user never retypes it
      localStorage.setItem("resetEmail", email);

      navigate("/auth/verify-code");
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      setErrors(apiErrors || { general: "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <NavigationBar />
      <PageContainer>
        <FormContainer>
          <StyledContainer>
            <Typography variant="h5" align="left" gutterBottom sx={{ color: "#043873", fontWeight: 700 }}>
              Forgot Password
            </Typography>

            <Typography variant="body2" align="left" style={{ marginBottom: "20px" }}>
              Enter your email address and we&apos;ll send you a code to reset your password.{" "}
              <Link to="/auth/login" style={{ color: "#4F9CF9", textDecorationColor: "#A7CEFC" }}>
                Back to login
              </Link>
            </Typography>

            <form onSubmit={handleSendCode}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 12 },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#A7CEFC" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4F9CF9" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4F9CF9" },
                }}
              />

              {errors.general && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  {errors.general}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={submitting}
                sx={{
                  mt: 2,
                  mb: 2,
                  height: 54,
                  background: "#043873",
                  color: "#FFFFFF",
                  borderRadius: "16px",
                  textTransform: "none",
                  fontWeight: 600,
                  letterSpacing: ".2px",
                  boxShadow: "0 10px 20px rgba(79,156,249,0.35)",
                  "&:hover": {
                    background: "#062E63",
                    boxShadow: "0 12px 24px rgba(79,156,249,0.45)",
                  },
                }}
              >
                {submitting ? "Sending..." : "Send Code"}
              </Button>
            </form>
          </StyledContainer>
        </FormContainer>
        <SidePanel />
      </PageContainer>
    </>
  );
};
