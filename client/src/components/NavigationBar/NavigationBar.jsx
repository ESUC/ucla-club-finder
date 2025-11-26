import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './NavigationBar.css';

const NavigationBar = () => {
  const navItems = [
    { text: 'Home', to: '/home' },
    { text: 'Saved Clubs', to: '/saved-clubs' },
    { text: 'About', icon: <InfoOutlinedIcon />, to: '/about' },
    { text: 'Login', to: '/auth/login', isLogin: true },
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
          <span className="navbar-logo-text">esucla</span>
        </div>
        <Box className="navbar-buttons">
          {navItems.map((item) => {
            const isLogin = item.text === "Login";

            return isLogin ? (
              <Button
                key={item.text}
                component={Link}
                to={item.to}
                className="navbar-login-button"
              >
                {item.text}
              </Button>
            ) : (
              <Button
                key={item.text}
                component={Link}
                to={item.to}
                startIcon={item.icon}
                className="navbar-button"
              >
                {item.text}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
