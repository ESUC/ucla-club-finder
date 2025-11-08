import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ListAltIcon from "@mui/icons-material/ListAlt";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  background: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08) !important;
  border-bottom: 1px solid #e2e8f0;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  min-height: 72px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  letter-spacing: -0.5px;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavButtons = styled(Box)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const NavButton = styled(Button)`
  color: #64748b !important;
  font-weight: 500 !important;
  font-family: 'Inter', 'Roboto', Arial, sans-serif !important;
  text-transform: none !important;
  font-size: 0.9rem !important;
  padding: 10px 16px !important;
  border-radius: 10px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  min-width: auto !important;
  
  &:hover {
    background: #f8fafc !important;
    color: #0f172a !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  .MuiButton-startIcon {
    margin-right: 8px;
    color: #94a3b8;
  }
  
  &:hover .MuiButton-startIcon {
    color: #64748b;
  }
`;

const NavigationBar = () => {
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, to: '/home' },
    { text: 'Saved Clubs', icon: <ListAltIcon />, to: '/saved-clubs' },
    { text: 'Login', icon: <LoginIcon />, to: '/auth/login' },
    { text: 'Register', icon: <HowToRegIcon />, to: '/auth/register' },
    { text: 'About', icon: <InfoIcon />, to: '/about' },
  ];

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Logo>
          <LogoImage 
            src="/esuc-logo.png" 
            alt="ESUC Logo" 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <LogoText>UCLA Club Finder</LogoText>
        </Logo>
        <NavButtons>
          {navItems.map((item) => (
            <NavButton
              key={item.text}
              component={Link}
              to={item.to}
              startIcon={item.icon}
            >
              {item.text}
            </NavButton>
          ))}
        </NavButtons>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;


