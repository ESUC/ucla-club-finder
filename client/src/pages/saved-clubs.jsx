import { useState } from 'react';
import { Link } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import ClubCarousel from '../components/ClubCarousel/ClubCarousel';
import './SavedClubs.css';

// Mock data - TODO: Fetch actual clubs from API
const getMockJoinedClubs = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Joined Club ${i + 1}`,
    logo: null,
  }));

const getMockSavedClubs = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Club ${i + 1}`,
    logo: null,
  }));

export const SavedClubs = () => {
  const [joinedClubs] = useState(getMockJoinedClubs);
  const [savedClubs] = useState(getMockSavedClubs);

  return (
    <div className="saved-clubs-page">
      <NavigationBar />
      <div className="saved-clubs-content">
        <Link to="/edit-profile" className="saved-clubs-edit-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#043873" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Edit Profile</span>
        </Link>
        <ClubCarousel title="The Clubs I Am In" clubs={joinedClubs} />
        <ClubCarousel title="Saved Clubs" clubs={savedClubs} />
      </div>
      <Footer />
    </div>
  );
};

export default SavedClubs;
