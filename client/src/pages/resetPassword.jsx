import { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import { API_BASE } from "../config";

const AUTH_API_BASE = `${API_BASE}/api/userAuth`;

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

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/auth/forgot-password");
    }
  }, [email, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      await axios.post(`${AUTH_API_BASE}/auth/reset-password`, {
        email,
        password,
        confirmPassword,
      });

      navigate("/auth/login");
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      setErrors(apiErrors || { general: "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <FormContainer>
          <StyledContainer>
            <Typography variant="h5" align="left" gutterBottom sx={{ color: "#043873", fontWeight: 700 }}>
              Reset Password
            </Typography>

            <Typography variant="body2" align="left" style={{ marginBottom: "20px" }}>
              Enter a new password.{" "}
              <Link to="/auth/login" style={{ color: "#4F9CF9", textDecorationColor: "#A7CEFC" }}>
                Back to login
              </Link>
            </Typography>

            <form onSubmit={handleReset}>
              <TextField
                fullWidth
                margin="normal"
                label="New password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 12 },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Confirm new password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm((s) => !s)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 12 },
                }}
              />

              {errors.code && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  {errors.code}
                </Typography>
              )}

              {errors.email && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  {errors.email}
                </Typography>
              )}

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
                {submitting ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </StyledContainer>
        </FormContainer>
        <SidePanel />
      </PageContainer>
    </>
  );
};
