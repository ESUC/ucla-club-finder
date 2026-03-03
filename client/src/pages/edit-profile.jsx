import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import { API_BASE } from '../config';
import './EditProfile.css';

const defaultFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  pronouns: '',
  major: 'N/A',
  year: 'N/A',
  bio: '',
};

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
  if (needMajor && needYear) return 'Please update your Major and Graduation Year below.';
  if (needMajor) return 'Please update your Major below.';
  if (needYear) return 'Please update your Graduation Year below.';
  return '';
}

export const EditProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('token') || null;
  const [formData, setFormData] = useState(defaultFormData);
  const [showAlert, setShowAlert] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_BASE}/api/users/profile/${userId}`)
      .then((res) => {
        const d = res.data || {};
        setFormData({
          firstName: d.firstName ?? '',
          lastName: d.lastName ?? '',
          username: d.username ?? '',
          email: d.email ?? '',
          pronouns: d.pronouns ?? '',
          major: d.major ?? 'N/A',
          year: d.year ?? 'N/A',
          bio: d.bio ?? '',
        });
        setShowAlert(needsProfileUpdate(d.major, d.year));
      })
      .catch(() => setFormData(defaultFormData));
  }, [userId]);

  const shouldShowAlert = needsProfileUpdate(formData.major, formData.year);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return;
    setSaveError(null);
    setSaving(true);
    axios
      .put(`${API_BASE}/api/users/profile/${userId}`, formData)
      .then(() => {
        setShowAlert(needsProfileUpdate(formData.major, formData.year));
        navigate('/saved-clubs');
      })
      .catch((err) => {
        const data = err.response?.data;
        const msg = data?.errors?.general ?? data?.error ?? (data?.errors && Object.values(data.errors).join(' ')) ?? 'Failed to save profile.';
        setSaveError(typeof msg === 'string' ? msg : 'Failed to save profile.');
      })
      .finally(() => setSaving(false));
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="edit-profile-page">
      <NavigationBar />
      <div className="edit-profile-content">
        <div className="edit-profile-header">
          <button className="edit-profile-back-button" onClick={handleCancel} aria-label="Go back">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="edit-profile-title">Edit Profile</h1>
        </div>

        {shouldShowAlert && showAlert && (
          <div className="edit-profile-alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <div className="edit-profile-alert-content">
              <p className="edit-profile-alert-title">Profile Update Required</p>
              <p className="edit-profile-alert-message">
                {getProfileUpdateMessage(formData.major, formData.year)}
              </p>
            </div>
            <button
              className="edit-profile-alert-close"
              onClick={() => setShowAlert(false)}
              aria-label="Close alert"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {saveError && (
          <div className="edit-profile-alert edit-profile-error" role="alert">
            <p>{saveError}</p>
            <button type="button" className="edit-profile-alert-close" onClick={() => setSaveError(null)} aria-label="Dismiss">×</button>
          </div>
        )}

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-profile-field">
            <label className="edit-profile-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="edit-profile-input"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="edit-profile-input"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="edit-profile-input"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="edit-profile-input"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Pronouns</label>
            <input
              type="text"
              name="pronouns"
              value={formData.pronouns}
              onChange={handleInputChange}
              className="edit-profile-input"
              placeholder="she/her"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Major</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              className="edit-profile-input"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="edit-profile-input"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="edit-profile-textarea"
              rows="4"
            />
          </div>

          <div className="edit-profile-buttons">
            <button type="button" className="edit-profile-cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="edit-profile-save-button" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;

