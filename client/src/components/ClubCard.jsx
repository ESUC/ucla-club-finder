import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import ClubPopUp from './ClubPopUp';

import { API_BASE } from '../config';

const PinIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 38 38" fill={filled ? '#043873' : 'none'}>
    <path d="M18.5571 26.2893V34.0215" stroke={filled ? '#043873' : '#99A1AF'} strokeWidth="3.09288" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.9179 16.6398C13.9176 17.2152 13.7568 17.7792 13.4536 18.2682C13.1503 18.7572 12.7167 19.1519 12.2014 19.408L9.44873 20.7998C8.93343 21.0558 8.49979 21.4505 8.19654 21.9396C7.8933 22.4286 7.73248 22.9925 7.73218 23.5679V24.7432C7.73218 25.1533 7.89511 25.5467 8.18512 25.8367C8.47513 26.1267 8.86848 26.2896 9.27862 26.2896H27.8359C28.2461 26.2896 28.6394 26.1267 28.9294 25.8367C29.2194 25.5467 29.3824 25.1533 29.3824 24.7432V23.5679C29.382 22.9925 29.2212 22.4286 28.918 21.9396C28.6147 21.4505 28.1811 21.0558 27.6658 20.7998L24.9131 19.408C24.3978 19.1519 23.9642 18.7572 23.661 18.2682C23.3577 17.7792 23.1969 17.2152 23.1966 16.6398V10.8252C23.1966 10.4151 23.3595 10.0217 23.6495 9.73172C23.9395 9.44171 24.3329 9.27878 24.743 9.27878C25.5633 9.27878 26.35 8.95293 26.93 8.3729C27.5101 7.79287 27.8359 7.00618 27.8359 6.1859C27.8359 5.36562 27.5101 4.57893 26.93 3.9989C26.35 3.41887 25.5633 3.09302 24.743 3.09302H12.3715C11.5512 3.09302 10.7645 3.41887 10.1845 3.9989C9.60447 4.57893 9.27862 5.36562 9.27862 6.1859C9.27862 7.00618 9.60447 7.79287 10.1845 8.3729C10.7645 8.95293 11.5512 9.27878 12.3715 9.27878C12.7816 9.27878 13.175 9.44171 13.465 9.73172C13.755 10.0217 13.9179 10.4151 13.9179 10.8252V16.6398Z" stroke={filled ? '#043873' : '#99A1AF'} strokeWidth="3.09288" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CardContainer = styled(Card)`
  width: 100%;
  aspect-ratio: 1 / 1.05;
  border-radius: 20px !important;
  background: #fff !important;
  box-shadow: none !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  overflow: hidden !important;
  cursor: pointer;
  padding: 12px 12px 16px;
  gap: 20px;
  transition: all 0.25s ease;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1) !important;
    transform: translateY(-4px);
    border-color: rgba(0, 0, 0, 0.18);
  }
`;

const SaveButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
  z-index: 3;
  padding: 4px !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: rgba(4, 56, 115, 0.06) !important;
  }
`;

const LogoArea = styled.div`
  width: 65%;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ClubName = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #9ca3af;
  text-align: center;
  margin: 0;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 90%;
`;

const ClubCard = ({
  isBoxOpen,
  onOpen,
  onClose,
  img,
  title,
  userId,
  clubId,
  savedClubIds = [],
  onSaveSuccess,
  fullName,
  description,
  clubType,
  major,
  url,
}) => {
  const navigate = useNavigate();
  const isFavorited = savedClubIds.some((id) => String(id) === String(clubId));

  const handleToggleFavorite = () => {
    if (!userId) {
      navigate('/auth/login');
      return;
    }
    if (isFavorited) {
      axios
        .delete(`${API_BASE}/api/users/save/${clubId}`, { data: { userId } })
        .then(() => onSaveSuccess?.())
        .catch(() => {});
    } else {
      axios
        .post(`${API_BASE}/api/users/save/${clubId}`, { userId })
        .then(() => onSaveSuccess?.())
        .catch(() => {});
    }
  };

  const displayFullName = fullName || title;

  return (
    <>
      <CardContainer onClick={onOpen}>
        <SaveButton
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite();
          }}
        >
          <PinIcon filled={isFavorited} />
        </SaveButton>

        <LogoArea>
          {img ? (
            <LogoImage src={img} alt={displayFullName} />
          ) : (
            <span style={{ color: '#9ca3af', fontSize: 14 }}>Club Photo</span>
          )}
        </LogoArea>

        <ClubName>{displayFullName}</ClubName>
      </CardContainer>

      <ClubPopUp
        isOpen={isBoxOpen}
        onClose={onClose}
        club={
          clubId
            ? {
                photo: img,
                title,
                fullName: displayFullName,
                description,
                clubType,
                major,
                link: url,
              }
            : null
        }
      />
    </>
  );
};

export default ClubCard;
