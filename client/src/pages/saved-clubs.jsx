<<<<<<< HEAD
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
=======
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
>>>>>>> origin/main
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import ClubCarousel from '../components/ClubCarousel/ClubCarousel';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import { API_BASE } from '../config';
import './SavedClubs.css';

function isNA(v) {
  const s = v == null ? '' : String(v).trim();
  return s === '' || s === 'N/A';
}

function needsProfileUpdate(major, year) {
  return isNA(major) || isNA(year);
}

function getProfileUpdateMessage(major, year) {
  const needMajor = isNA(major);
  const needYear = isNA(year);
  if (needMajor && needYear) return 'Please update your Major and Year in your profile.';
  if (needMajor) return 'Please update your Major in your profile.';
  if (needYear) return 'Please update your Graduation Year in your profile.';
  return '';
}

const Container = styled.div`
  width: 20em;
  margin: 0 auto;
`;

export const SavedClubs = () => {
  const [savedClubs, setSavedClubs] = useState([]);
  const userId = localStorage.getItem('token') || null;
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [profileUpdateMessage, setProfileUpdateMessage] = useState('');

<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [savedClubs, setSavedClubs] = useState([]);
  const [error, setError] = useState('');

  const logoutToLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      logoutToLogin();
      return;
    }

    setLoading(true);
    setError('');

    // NOTE: This assumes you updated your backend routes to be token-based:
    // GET http://localhost:4000/api/users/saved  (protected by authMiddleware)
    axios
      .get('http://localhost:4000/api/users/saved', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Your backend should return an array of saved clubs
        setSavedClubs(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (err?.response?.status === 401) return logoutToLogin();
        setError('Failed to load saved clubs.');
      })
      .finally(() => setLoading(false));
  }, []);
=======
  useEffect(() => {
    if (!userId) {
      queueMicrotask(() => {
        setLoading(false);
        setSavedClubs([]);
        setShowAlert(false);
        setProfileUpdateMessage('');
      });
      return;
    }
    axios
      .get(`${API_BASE}/api/users/saved/${userId}`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setSavedClubs(list);
      })
      .catch(() => setSavedClubs([]))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_BASE}/api/users/profile/${userId}`)
      .then((res) => {
        const { major, year } = res.data || {};
        setShowAlert(needsProfileUpdate(major, year));
        setProfileUpdateMessage(getProfileUpdateMessage(major, year));
      })
      .catch(() => {
        setShowAlert(false);
        setProfileUpdateMessage('');
      });
  }, [userId]);
>>>>>>> origin/main

  return (
    <div className="saved-clubs-page">
      <NavigationBar />
<<<<<<< HEAD

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {!!error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      <Container>
        <Carousel index={currentIndex} autoPlay={false} navButtonsAlwaysVisible={true}>
          {savedClubs.length === 0 ? (
            <FlippableCard>No saved clubs yet.</FlippableCard>
          ) : (
            savedClubs.map((club, index) => (
              <FlippableCard key={club?._id || index}>
                {/* Keep UI minimal; replace with your real card content later */}
                {club?.name || `Club ${index + 1}`}
              </FlippableCard>
            ))
          )}
        </Carousel>
      </Container>
    </>
  );
};

export default SavedClubs;
=======
      <div className="saved-clubs-content">
        {showAlert && (
          <div className="saved-clubs-alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <div className="saved-clubs-alert-content">
              <p className="saved-clubs-alert-title">Profile Update Required</p>
              <p className="saved-clubs-alert-message">
                {profileUpdateMessage}
              </p>
            </div>
            <button
              className="saved-clubs-alert-close"
              onClick={() => setShowAlert(false)}
              aria-label="Close alert"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <ProfileInfo />
        {loading ? (
          <p className="saved-clubs-loading">Loading saved clubs…</p>
        ) : savedClubs.length === 0 ? (
          <div className="no-saved-clubs-box">
            <p>No saved clubs yet.</p>
            <Link to="/home" className="go-to-clubs-button">
              Browse Clubs
            </Link>
          </div>
        ) : (
          <ClubCarousel title="Saved Clubs" clubs={savedClubs} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedClubs;
>>>>>>> origin/main
