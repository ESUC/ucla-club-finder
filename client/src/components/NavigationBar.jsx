import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListAltIcon from '@mui/icons-material/ListAlt';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background: #043873 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
  border-bottom: 1px solid #e2e8f0;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  width: 1920px;
  padding: 16px 72px 16px 220px;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
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
  width: 65px;
  height: 57px;
  flex-shrink: 0;
  aspect-ratio: 65/57;
`;

const LogoText = styled.span`
  color: #FFF;
  font-family: Inter;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
    { text: 'About', icon: <InfoIcon />, to: '/about' },
    { text: 'Login', icon: <LoginIcon />, to: '/auth/login' },
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
          <LogoText>esucla</LogoText>
        </Logo>
        <NavButtons>
          {navItems.map((item) => (
            <NavButton key={item.text} component={Link} to={item.to} startIcon={item.icon}>
              {item.text}
            </NavButton>
          ))}
        </NavButtons>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;
