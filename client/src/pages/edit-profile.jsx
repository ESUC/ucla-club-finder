import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import './EditProfile.css';

export const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Palina',
    lastName: 'Wang',
    username: 'costcosnumberonecustomer',
    email: 'costcosnumberonecustomer@ucla.edu',
    pronouns: 'she/her',
    major: 'food engineering',
    graduationYear: '99',
    bio: 'i def like engineering 😋',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save profile changes
    console.log('Profile updated:', formData);
    // Navigate back or show success message
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
            <label className="edit-profile-label">Graduation Year</label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
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
            <button type="submit" className="edit-profile-save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;

