import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import Footer from "../components/Footer/Footer";
import "../css/account.css";
import { API_BASE } from "../config";

const AUTH_API_BASE = `${API_BASE}/api/userAuth`;

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
    <div className="login-page-wrapper">
      <NavigationBar />
      <div className="login-content-area">
        <div className="login-container">
          <h3 className="account-title">Reset Password</h3>
          <h4 className="account-subtitle">
            Enter a new password.
            <Link to="/auth/login" className="account-link">Back to login</Link>
          </h4>

          <form className="account-form" onSubmit={handleReset}>
            <div className="account-input-wrapper">
              <div className="account-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="account-input"
                  placeholder="New password"
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors?.password && (
                <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.password}</p>
              )}
            </div>

            <div className="account-input-wrapper">
              <div className="account-password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="account-input"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors?.confirmPassword && (
                <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.confirmPassword}</p>
              )}
            </div>

            {errors?.code && (
              <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.code}</p>
            )}
            {errors?.email && (
              <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.email}</p>
            )}
            {errors?.general && (
              <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.general}</p>
            )}

            <button type="submit" className="account-button" disabled={submitting}>
              {submitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
