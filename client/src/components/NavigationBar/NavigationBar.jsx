import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in by checking localStorage for token
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage changes (for cross-tab updates)
    window.addEventListener('storage', checkAuth);

    // Check periodically for same-tab updates (e.g., after login)
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, [location]);

  // Build nav items conditionally
  const navItems = [
    { text: 'Home', to: '/about' },
    { text: 'Clubs', to: '/home' },
    ...(isLoggedIn ? [{ text: 'Saved Clubs', to: '/saved-clubs' }] : []),
  ];

  return (
    <AppBar position="fixed" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <div className="navbar-logo">
          <img
            className="navbar-logo-image"
            src="/esuc-logo.png"
            alt="ESUC Logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="navbar-logo-text">ClubFinder</span>
        </div>
        <Box className="navbar-buttons">
          {navItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.to}
              startIcon={item.icon}
              className="navbar-button"
            >
              {item.text}
            </Button>
          ))}
          {isLoggedIn ? (
            <Button
              component={Link}
              to="/saved-clubs"
              className="navbar-user-button"
              startIcon={<PersonIcon />}
            >
            </Button>
          ) : (
            <Button
              component={Link}
              to="/auth/login"
              className="navbar-login-button"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
