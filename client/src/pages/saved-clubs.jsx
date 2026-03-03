import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';

import FlippableCard from '../components/FlippableCard';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  width: 20em;
  margin: 0 auto;
`;

export const SavedClubs = () => {
  const [currentIndex] = useState(0);

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

  return (
    <>
      <h1>Saved Clubs</h1>
      <NavigationBar />

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
