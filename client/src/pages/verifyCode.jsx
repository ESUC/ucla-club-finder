import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import Footer from "../components/Footer/Footer";
import "../css/account.css";
import { API_BASE } from "../config";

const AUTH_API_BASE = `${API_BASE}/api/userAuth`;

export const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/auth/forgot-password");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      await axios.post(`${AUTH_API_BASE}/auth/verify-code`, { email, code });
      navigate("/auth/reset-password");
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      setErrors(apiErrors || { general: "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setErrors({});
    try {
      await axios.post(`${AUTH_API_BASE}/auth/forgot-password`, { email });
      setErrors({ success: "A new code has been sent to your email." });
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      setErrors(apiErrors || { general: "Could not resend code. Please try again." });
    }
  };

  return (
    <div className="login-page-wrapper">
      <NavigationBar />
      <div className="login-content-area">
        <div className="login-container">
          <h3 className="account-title">Verify Code</h3>
          <p className="account-subtitle">
            Enter the code we sent to your email.{" "}
            <button
              type="button"
              onClick={handleResend}
              className="account-link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              Resend?
            </button>
          </p>

          <form className="account-form" onSubmit={handleVerify}>
            <div className="account-input-wrapper">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="account-input"
                placeholder="6-digit code"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
              {errors?.code && (
                <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.code}</p>
              )}
            </div>

            {errors?.email && (
              <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.email}</p>
            )}
            {errors?.general && (
              <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.general}</p>
            )}
            {errors?.success && (
              <p style={{ color: "#166534", fontSize: "0.9rem", marginTop: 8 }}>{errors.success}</p>
            )}

            <button type="submit" className="account-button" disabled={submitting}>
              {submitting ? "Verifying..." : "Verify"}
            </button>

            <Link to="/auth/login" className="account-forgot">Back to login</Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
