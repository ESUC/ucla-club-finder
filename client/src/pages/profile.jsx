import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import { API_BASE } from '../config';
import './Profile.css';

export const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem('token');

  const logoutToLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  useEffect(() => {
    if (!token) { logoutToLogin(); return; }
    axios
      .get(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch((err) => {
        if (err?.response?.status === 401) logoutToLogin();
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Warn if file is larger than 700KB
    if (file.size > 700 * 1024) {
      setUploadError('Image is too large. Please choose a photo under 700KB.');
      return;
    }

    setUploadError('');
    setUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      axios
        .patch(
          `${API_BASE}/api/users/me`,
          { profilePicture: base64 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          const updated = res.data?.user ?? res.data;
          setUser((prev) => ({ ...prev, profilePicture: updated.profilePicture ?? base64 }));
        })
        .catch(() => setUploadError('Failed to upload photo. Please try again.'))
        .finally(() => setUploading(false));
    };
    reader.readAsDataURL(file);

    // Reset file input so the same file can be re-selected if needed
    e.target.value = '';
  };

  if (loading) {
    return (
      <div className="profile-page">
        <NavigationBar />
        <div className="profile-loading">Loading your profile…</div>
        <Footer />
      </div>
    );
  }

  const savedClubs = Array.isArray(user?.savedClubs) ? user.savedClubs : [];
  const joinedClubs = Array.isArray(user?.joinedClubs) ? user.joinedClubs : [];
  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Your Name';

  return (
    <div className="profile-page">
      <NavigationBar />

      <div className="profile-content">
        <div className="profile-card">

          {/* Profile Picture */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-button">
              <div className="profile-avatar-inner">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="profile-avatar-img"
                  />
                ) : (
                  <svg className="profile-avatar-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                )}
              </div>
              <button
                className="profile-avatar-add-btn"
                onClick={handlePictureClick}
                title={uploading ? 'Uploading…' : 'Upload a new photo'}
                aria-label="Upload profile picture"
                disabled={uploading}
              >
                {uploading ? '…' : '+'}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {uploadError && <p className="profile-upload-error">{uploadError}</p>}
          </div>

          {/* Name & Basic Info */}
          <h1 className="profile-name">{displayName}</h1>
          {user?.username && <p className="profile-username">@{user.username}</p>}
          {user?.pronouns && <p className="profile-pronouns">{user.pronouns}</p>}

          {/* Stats row */}
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-number">{savedClubs.length}</span>
              <span className="profile-stat-label">Saved</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span className="profile-stat-number">{joinedClubs.length}</span>
              <span className="profile-stat-label">Joined</span>
            </div>
          </div>

          {/* Details */}
          <div className="profile-details">
            {user?.major && user.major !== 'N/A' && (
              <p className="profile-detail"><span className="profile-detail-label">Major</span>{user.major}</p>
            )}
            {user?.year && user.year !== 'N/A' && (
              <p className="profile-detail"><span className="profile-detail-label">Class of</span>{user.year}</p>
            )}
            {user?.bio && (
              <p className="profile-bio">{user.bio}</p>
            )}
          </div>

          {/* Edit Profile button */}
          <button className="profile-edit-btn" onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </button>
        </div>

        {/* Saved Clubs */}
        {savedClubs.length > 0 && (
          <div className="profile-clubs-section">
            <h2 className="profile-section-title">Saved Clubs</h2>
            <div className="profile-clubs-row">
              {savedClubs.map((club) => (
                <div key={club._id} className="profile-club-logo-wrap" title={club.clubName || club.abbreviation}>
                  <img
                    src={club.img}
                    alt={club.abbreviation || club.clubName}
                    className="profile-club-logo"
                  />
                  <span className="profile-club-name">{club.abbreviation || club.clubName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Joined Clubs */}
        {joinedClubs.length > 0 && (
          <div className="profile-clubs-section">
            <h2 className="profile-section-title">Clubs I&apos;m In</h2>
            <div className="profile-clubs-row">
              {joinedClubs.map((club) => (
                <div key={club._id} className="profile-club-logo-wrap" title={club.clubName || club.abbreviation}>
                  <img
                    src={club.img}
                    alt={club.abbreviation || club.clubName}
                    className="profile-club-logo"
                  />
                  <span className="profile-club-name">{club.abbreviation || club.clubName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
