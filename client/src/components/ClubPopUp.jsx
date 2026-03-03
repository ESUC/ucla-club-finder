import { useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { API_BASE } from '../config';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 750px;
  height: 700px;
  max-width: 90vw;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1a3a5d, #0f172a);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const ClubPhoto = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 9px;
  object-fit: cover;
`;

const ClubNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const ClubName = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
`;

const ClubAcronym = styled.div`
  background: #ffc107;
  color: #0f172a;
  font-weight: 500;
  align-self: flex-start;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 12px;
  margin-top: 4px;
  display: inline-block;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #ffc107;
  }
`;

const InfoSection = styled.div`
  background: ${(props) => props.bg || '#f1f5f9'};
  margin: 12px;
  height: 80px;
  border-radius: 12px;
  padding: 16px;
  gap: 14.68px;
`;

const SectionTitle = styled.div`
  font-weight: 900;
  color: #0f172a;
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

const SectionContent = styled.div`
  margin-top: 8px;
  align-self: stretch;
  font-size: 0.9rem;
  color: #334155;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #1a3a5d, #0f172a);
  color: #fff;
  border-radius: 12px;
  margin: 12px 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 90px;
`;

const CTALeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CTAButton = styled.a`
  background: #ffc107;
  color: #0f172a;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background: #ffb300;
  }
`;

const JoinButton = styled.button`
  background: ${(props) => (props.isJoined ? 'rgba(255,255,255,0.15)' : 'transparent')};
  color: #fff;
  border: 2px solid ${(props) => (props.isJoined ? '#4ade80' : 'rgba(255,255,255,0.5)')};
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${(props) => (props.isJoined ? '#86efac' : '#fff')};
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function ClubPopUp({ isOpen, onClose, club, userId, clubId, joinedClubIds = [], onJoinSuccess }) {
  const [joining, setJoining] = useState(false);

  if (!club) return null;

  const isJoined = joinedClubIds.some((id) => String(id) === String(clubId));
  const token = localStorage.getItem('token');

  const handleJoinToggle = () => {
    if (!token || !userId) {
      window.location.href = '/auth/login';
      return;
    }
    setJoining(true);
    const request = isJoined
      ? axios.delete(`${API_BASE}/api/users/join/${clubId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : axios.post(`${API_BASE}/api/users/join/${clubId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

    request
      .then(() => onJoinSuccess?.())
      .catch((err) => console.error('Join toggle error:', err.message))
      .finally(() => setJoining(false));
  };

  return createPortal(
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <ClubPhoto src={club.photo} alt={club.title} />
          <ClubNameContainer>
            <ClubName>{club.fullName}</ClubName>
            <ClubAcronym>{club.title}</ClubAcronym>
          </ClubNameContainer>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <InfoSection>
          <SectionTitle>Targeted Major</SectionTitle>
          <SectionContent>{club.major || 'Major Name Here'}</SectionContent>
        </InfoSection>

        <InfoSection bg="#fff3cd">
          <SectionTitle>Club Type</SectionTitle>
          <SectionContent>{club.clubType || 'e.g., Honor Society, Competition Team'}</SectionContent>
        </InfoSection>

        <InfoSection>
          <SectionTitle>About This Club</SectionTitle>
          <SectionContent>{club.description || 'Description of the club goes here.'}</SectionContent>
        </InfoSection>

        <CTASection>
          <CTALeft>
            <div>Interested in {club.fullName}? Click below:</div>
            <CTAButton href={club.link || '#'} target="_blank">Sign Up / Learn More</CTAButton>
          </CTALeft>
          <JoinButton
            isJoined={isJoined}
            onClick={handleJoinToggle}
            disabled={joining}
          >
            {joining ? '…' : isJoined ? "✓ I'm a Member" : "I'm in this Club"}
          </JoinButton>
        </CTASection>
      </ModalContainer>
    </Overlay>,
    document.body
  );
}
