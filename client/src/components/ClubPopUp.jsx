import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;
  padding: 80px 16px 40px;
  z-index: 1000;
  overflow-y: auto;
`;

const Modal = styled.div`
  width: 480px;
  max-width: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  border: 2px solid rgba(255, 209, 0, 0.25);
  box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.22);
  font-family: 'DM Sans', 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const Header = styled.div`
  background: linear-gradient(180deg, #043873, #054d87);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 180px;
    height: 180px;
    top: -50px;
    right: -40px;
    border-radius: 50%;
    background: rgba(255, 209, 0, 0.08);
    filter: blur(50px);
    pointer-events: none;
  }
`;

const PhotoFrame = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 209, 0, 0.3);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 1;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoPlaceholder = styled.div`
  color: rgba(255, 209, 0, 0.4);
  font-size: 10px;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
`;

const ClubName = styled.div`
  font-size: 15px;
  color: #fff;
  line-height: 1.3;
`;

const AcronymBadge = styled.div`
  background: linear-gradient(180deg, #ffd100, #ffc400);
  color: #043873;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 999px;
  align-self: flex-start;
  line-height: 1.5;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: rgba(255, 209, 0, 0.6);
  font-size: 22px;
  cursor: pointer;
  z-index: 2;
  line-height: 1;
  padding: 2px;

  &:hover {
    color: #ffd100;
  }
`;

const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InfoCard = styled.div`
  border-radius: 12px;
  border: 1.5px solid ${(props) => props.$borderColor || '#f3f4f6'};
  padding: 14px 16px;
  background: ${(props) => props.$bg || '#fff'};
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const InfoIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${(props) => props.$bg || '#043873'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InfoTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #043873;
`;

const InfoText = styled.div`
  font-size: 13px;
  color: ${(props) => props.$color || 'rgba(4, 56, 115, 0.75)'};
  line-height: 1.5;
  padding-left: 38px;
`;

const CTACard = styled.div`
  border-radius: 12px;
  border: 1.5px solid rgba(255, 209, 0, 0.25);
  padding: 16px;
  background: linear-gradient(180deg, #043873, #054d87);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    top: -20px;
    right: -30px;
    border-radius: 50%;
    background: rgba(255, 209, 0, 0.08);
    filter: blur(30px);
    pointer-events: none;
  }
`;

const CTATitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
`;

const CTAText = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(180deg, #ffd100, #ffc400);
  color: #043873;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 6px 12px rgba(255, 209, 0, 0.25);
  position: relative;
  z-index: 1;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

const FooterBar = styled.div`
  padding: 12px 16px 14px;
  border-top: 1.5px solid rgba(255, 209, 0, 0.15);
`;

const CloseFullBtn = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(90deg, #e5e7eb, #d1d5dc);
  color: #043873;
  font-size: 13px;
  font-weight: 500;
  font-family: 'DM Sans', 'Inter', sans-serif;
  cursor: pointer;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.96);
  }
`;

const MajorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" fill="white"/></svg>
);
const TypeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#043873"/></svg>
);
const AboutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/></svg>
);
const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="#043873" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function ClubPopUp({ isOpen, onClose, club }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!club) return null;

  return createPortal(
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <PhotoFrame>
            {club.photo ? (
              <Photo src={club.photo} alt={club.title} />
            ) : (
              <PhotoPlaceholder>Photo</PhotoPlaceholder>
            )}
          </PhotoFrame>
          <HeaderInfo>
            <ClubName>{club.fullName}</ClubName>
            <AcronymBadge>{club.title}</AcronymBadge>
          </HeaderInfo>
          <CloseBtn onClick={onClose} aria-label="Close">×</CloseBtn>
        </Header>

        <Body>
          <InfoCard $borderColor="rgba(4,56,115,0.15)" $bg="linear-gradient(170deg, rgba(4,56,115,0.04), rgba(4,56,115,0.08))">
            <InfoHeader>
              <InfoIcon><MajorIcon /></InfoIcon>
              <InfoTitle>Targeted Major</InfoTitle>
            </InfoHeader>
            <InfoText>{club.major || 'Not specified'}</InfoText>
          </InfoCard>

          <InfoCard $borderColor="rgba(255,209,0,0.35)" $bg="linear-gradient(170deg, rgba(255,209,0,0.08), rgba(255,209,0,0.15))">
            <InfoHeader>
              <InfoIcon $bg="linear-gradient(180deg, #ffd100, #ffc400)"><TypeIcon /></InfoIcon>
              <InfoTitle>Club Type</InfoTitle>
            </InfoHeader>
            <InfoText>{club.clubType || 'Not specified'}</InfoText>
          </InfoCard>

          <InfoCard>
            <InfoHeader>
              <InfoIcon $bg="linear-gradient(180deg, #043873, #065a9e)"><AboutIcon /></InfoIcon>
              <InfoTitle>About This Club</InfoTitle>
            </InfoHeader>
            <InfoText $color="#364153">
              {club.description || 'No description available.'}
            </InfoText>
          </InfoCard>

          <CTACard>
            <CTATitle>How to Join</CTATitle>
            <CTAText>
              Interested in joining {club.fullName}? Click the button below to learn more.
            </CTAText>
            <CTAButton href={club.link || '#'} target="_blank" rel="noopener noreferrer">
              Sign Up / Learn More
              <ExternalLinkIcon />
            </CTAButton>
          </CTACard>
        </Body>

        <FooterBar>
          <CloseFullBtn onClick={onClose}>Close</CloseFullBtn>
        </FooterBar>
      </Modal>
    </Overlay>,
    document.body
  );
}
