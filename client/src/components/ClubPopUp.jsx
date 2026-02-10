import styled from 'styled-components';
import { createPortal } from 'react-dom';

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
  width: 700px;
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
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const ClubNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const ClubName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;

const ClubAcronym = styled.div`
  background: #ffc107;
  color: #0f172a;
  font-weight: 500;
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
  height: 70px;
  border-radius: 12px;
  padding: 16px;
  gap: 14.68px;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  color: #0f172a;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const SectionContent = styled.div`
  font-size: 0.85rem;
  color: #334155;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #1a3a5d, #0f172a);
  color: #fff;
  border-radius: 12px;
  height: 70px;
  margin: 12px 16px;
  padding: 16px;
`;

const CTAButton = styled.a`
  background: #ffc107;
  color: #0f172a;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-block;
  margin-top: 8px;
  text-decoration: none;

  &:hover {
    background: #ffb300;
  }
`;

export default function ClubPopUp({ isOpen, onClose, club }) {
  if (!club) return null;

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
          <div>Interested in joining {club.fullName}? Click below:</div>
          <CTAButton href={club.link || '#'} target="_blank">Sign Up / Learn More</CTAButton>
        </CTASection>
      </ModalContainer>
    </Overlay>,
    document.body
  );
}
