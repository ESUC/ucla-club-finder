import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListAltIcon from '@mui/icons-material/ListAlt';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  padding: 0 !important;
  background: #043873 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
  border-bottom: 1px solid #e2e8f0;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  max-width: 1900px;
  width: 100%;
  height: 65px;
  
  padding: 16px 45px 16px 100px !important;
  margin: 0 auto;
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
  width: 42px;
  height: auto;
  flex-shrink: 0;
  aspect-ratio: 65/57;
`;

const LogoText = styled.span`
  color: #FFF;
  font-family: Inter;
  font-size: 20px;
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
  color: #FFF !important;
  font-weight: 500 !important;
  font-family: 'DM Sans', 'Inter', 'Roboto', Arial, sans-serif !important;
  text-transform: none !important;
  font-size: 0.83rem !important;
  padding: 10px 16px !important;
  border-radius: 8px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  min-width: auto !important;

  &:hover {
    background: #f8fafc !important;
    color: #0f172a !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .MuiButton-startIcon {
    margin-right: 6px;
    color: #FFF;
  }

  &:hover .MuiButton-startIcon {
    color: #64748b;
  }
`;

const LoginButton = styled(Button)`
  color: #043873;
  background: #FFE492;
  font-weight: 500 !important;
  text-transform: none !important;
  font-family: 'DM Sans', 'Inter', 'Roboto', Arial, sans-serif !important;
  font-size: 0.83rem !important;
  padding: 10px 16px !important;
  border-radius: 8px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  min-width: auto !important;

  &.MuiButton-root {
    background-color: #FFE492 !important;
    color: #043873 !important;
  }

  &.MuiButton-root:hover {
    background-color: #f8fafc !important;
    color: #0f172a !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
`;

const NavigationBar = () => {
  const navItems = [
    { text: 'Home', to: '/home' },
    { text: 'Saved Clubs', to: '/saved-clubs' },
    { text: 'About', icon: <InfoOutlinedIcon />, to: '/about' },
    { text: 'Login', to: '/auth/login', isLogin: true },
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
          {navItems.map((item) => {
            const isLogin = item.text === "Login";

            return isLogin ? (
              <LoginButton key={item.text} component={Link} to={item.to}>
                {item.text}
              </LoginButton>
            ) : (
              <NavButton key={item.text} component={Link} to={item.to} startIcon={item.icon}>
                {item.text}
              </NavButton>
            );
          })}
        </NavButtons>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;
