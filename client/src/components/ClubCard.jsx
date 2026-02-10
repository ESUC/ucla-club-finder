import styled from 'styled-components';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import ClubPopUp from './ClubPopUp';

const CardContainer = styled(Card)`
  width: 280px;
  height: 350px;
  border-radius: 12px !important;
  background: #fff !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1) !important;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.18) !important;
    transform: translateY(-6px);
    border-color: #0f172a;

    .logo-section {
      transform: scale(1.02);
    }

    .favorite-button {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

const FavoriteButton = styled(IconButton)`
  position: absolute !important;
  top: 12px;
  right: 12px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(8px);
  border-radius: 50% !important;
  width: 36px !important;
  height: 36px !important;
  opacity: 0.8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;

  &:hover {
    background: rgba(255, 255, 255, 1) !important;
    transform: scale(1.15) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }

  .MuiSvgIcon-root {
    font-size: 20px !important;
    color: ${(props) => (props.isFavorited ? '#f59e0b' : '#64748b')} !important;
    transition: all 0.3s ease !important;
  }

  &:hover .MuiSvgIcon-root {
    color: ${(props) => (props.isFavorited ? '#fbbf24' : '#0f172a')} !important;
    transform: ${(props) => (props.isFavorited ? 'rotate(10deg)' : 'scale(1.1)')} !important;
  }
`;

const LogoSection = styled.div`
  width: 280px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #ffffff;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 54, 93, 0.02) 0%, rgba(255, 196, 0, 0.02) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${LogoSection}:hover & {
    transform: scale(1.05);
  }
`;

const FooterSection = styled.div`
  padding: 16px 20px 20px 20px;
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
  flex: 1;
`;

const FullName = styled.div`
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 6px;
  line-height: 1.3;
`;

const Abbreviation = styled.div`
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.4s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  z-index: 1000;
`;

const Content = styled.div`
  position: absolute;
  background: white;
  width: 400px;
  max-width: 90vw;
  padding: 2em;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const BoxClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #64748b;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #1a365d;
  }
`;

const ClubCard = ({
  isBoxOpen,
  onOpen,
  onClose,
  img,
  title,
  userId,
  clubId,
  fullName,
  description,
  clubType,
  major,
  meetingDays,
  size,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      axios
        .delete(`http://localhost:4000/api/users/save/${clubId}`, { data: { userId } })
        .then(() => setIsFavorited(false))
        .catch((err) => console.log(err.message));
    } else {
      axios
        .post(`http://localhost:4000/api/users/save/${clubId}`, { userId })
        .then(() => setIsFavorited(true))
        .catch((err) => console.log(err.message));
    }
  };

  const getFullName = (clubTitle) => {
    const fullNames = {
      UPE: 'Upsilon Pi Epsilon',
      BSG: 'Bruin Spacecraft Group',
      ASME: 'American Society of Mechanical Engineers',
      AIAA: 'American Institute of Aeronautics and Astronautics',
      DBF: 'Design Build Fly',
      IEEE: 'Institute of Electrical and Electronics Engineers',
      MRS: 'Materials Research Society',
      'QWER Hacks': 'QWER Hacks',
      AIChe: 'American Institute of Chemical Engineers',
      ITE: 'Institute of Transportation Engineers',
      '3D4E': '3D4E',
      MentorSEAS: 'MentorSEAS',
      'UAS@UCLA': 'UAS at UCLA',
      BMES: 'Biomedical Engineering Society',
      'Rocket Project': 'Rocket Project',
      SWE: 'Society of Women Engineers',
      'ACM@UCLA': 'Association for Computing Machinery',
      'SOLES|SHPE@UCLA': 'SOLES and SHPE at UCLA',
      EWB: 'Engineers Without Borders',
      'IEEE-WIE': 'IEEE Women in Engineering',
      SWUG: 'Software Undergraduate Group',
    };
    return fullNames[clubTitle] || clubTitle;
  };

  const displayFullName = fullName || getFullName(title);

  return (
    <>
      <CardContainer onClick={onOpen}>
        <FavoriteButton
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite();
          }}
          color={isFavorited ? 'primary' : 'default'}
          isFavorited={isFavorited}
          className="favorite-button"
        >
          {isFavorited ? <StarIcon /> : <StarBorderIcon />}
        </FavoriteButton>

        <LogoSection className="logo-section">
          <LogoImage src={img} alt={title} />
        </LogoSection>

        <FooterSection>
          <FullName>{displayFullName}</FullName>
          <Abbreviation>{title}</Abbreviation>
        </FooterSection>

        {createPortal(
          //added details for when the card is clicked
          <ClubPopUp isOpen={isBoxOpen} onClose={onClose} club={clubId ? { photo: img, title, fullName: displayFullName, description, clubType, major, meetingDays, size } : null} />,
          document.body
        )}
      </CardContainer>
    </>
  );
};

export default ClubCard;
