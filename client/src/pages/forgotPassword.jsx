import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import Footer from "../components/Footer/Footer";
import "../css/account.css";

const API_BASE = "http://localhost:4000/api/userAuth";

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

      localStorage.setItem("resetEmail", email);
      navigate("/auth/verify-code");
    } catch (err) {
      const data = err?.response?.data;
      const apiErrors = data?.errors;
      const message = data?.error || (apiErrors && apiErrors.general);
      setErrors(apiErrors || { general: message || "Something went wrong. Check that the server is running and your email exists." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <NavigationBar />
      <div className="login-content-area">
        <div className="login-container">
          <h3 className="account-title">Forgot Password</h3>
          <p className="account-subtitle" style={{ marginBottom: 20 }}>
            Enter your email address and we&apos;ll send you a code to reset your password.{" "}
            <Link to="/auth/login" className="account-link">
              Back to login
            </Link>
          </p>

          <form className="account-form" onSubmit={handleSendCode}>
            <div className="account-input-wrapper">
              <div className="account-input-with-icon">
                <span className="account-input-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  className="account-input account-input-with-icon-padding"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                />
              </div>
              {errors?.email && (
                <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.email}</p>
              )}
            </div>

            {errors?.general && (
              <p style={{ color: "#d32f2f", fontSize: "0.9rem", marginTop: 8 }}>{errors.general}</p>
            )}

            <button type="submit" className="account-button" disabled={submitting}>
              {submitting ? "Sending..." : "Send Code"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
