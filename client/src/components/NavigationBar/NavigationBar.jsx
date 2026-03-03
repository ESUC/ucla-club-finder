import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail') || '';
      setIsLoggedIn(!!token);
      setUserEmail(email);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, [location]);

  const navItems = [
    { text: 'Home', to: '/about' },
    { text: 'Clubs', to: '/home' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/auth/login';
  };

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
            <>
              <div className="navbar-user-area" title={userEmail || 'Logged in'}>
                <Button
                  component={Link}
                  to="/profile"
                  className="navbar-user-button"
                  aria-label="Saved clubs"
                >
                  <PersonIcon />
                </Button>
                <span className="navbar-logged-in-tooltip">
                  {userEmail ? `Logged in as ${userEmail}` : 'Logged in'}
                </span>
              </div>
              <Button
                className="navbar-login-button navbar-logout-button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
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
