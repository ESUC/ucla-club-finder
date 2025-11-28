import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import '../css/account.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePassword = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/users/auth/forgot-password', { email })
      .then((response) => {
        if (response && response.status === 200) {
          window.location.href = '/auth/verify-password';
          console.log(response);
        } else {
          console.log('Unsuccessful');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page-wrapper">
      <NavigationBar />
      <div className="login-content-area">
        <div className="login-container">
          <h3 className="account-title">Forgot Password</h3>
          <h4 className="account-subtitle">
            Enter your email address and we'll send you a code to reset your password. <Link to="/auth/login" className="account-link">Back to login</Link>
          </h4>
          <form className="account-form" onSubmit={handlePassword}>
            <div className="account-input-wrapper">
              <div className="account-input-with-icon">
                <svg
                  className="account-input-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  className="account-input account-input-with-icon-padding"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <button type="submit" className="account-button">Send Code</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
