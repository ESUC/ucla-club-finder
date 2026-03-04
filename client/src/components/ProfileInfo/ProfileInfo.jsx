import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { API_BASE } from "../../config";
import './ProfileInfo.css';

const defaultFormData = {
  username: '',
  major: 'N/A',
  year: 'N/A',
  bio: '',
};

const formatMajorYear = (major, year) => {
  if (!year || year === "N/A") return major;
  const shortYear = year.length === 4 ? year.slice(-2) : year;
  return `${major} '${shortYear}`;
};

const ProfileInfo = ({ savedCount = 0 }) => {
  const userId = localStorage.getItem('token') || null;
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_BASE}/api/users/profile/${userId}`)
      .then((res) => {
        const d = res.data || {};
        setFormData({
          username: d.username ?? '',
          major: d.major ?? 'N/A',
          year: d.year ?? 'N/A',
          bio: d.bio ?? '',
        });
      })
      .catch(() => {});
  }, [userId]);

  return (
    <div className="profile-component">
      <div className="profile-picture">
        <div className="profile-picture-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="138" height="138" viewBox="0 0 138 138" fill="none">
            <path d="M108.571 120V108.571C108.571 102.509 106.163 96.6955 101.876 92.4089C97.5895 88.1224 91.7757 85.7142 85.7136 85.7142H51.4279C45.3658 85.7142 39.552 88.1224 35.2655 92.4089C30.979 96.6955 28.5708 102.509 28.5708 108.571V120" stroke="white" strokeWidth="11.4286" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M68.572 62.8572C81.1956 62.8572 91.4291 52.6237 91.4291 40.0001C91.4291 27.3764 81.1956 17.1429 68.572 17.1429C55.9483 17.1429 45.7148 27.3764 45.7148 40.0001C45.7148 52.6237 55.9483 62.8572 68.572 62.8572Z" stroke="white" strokeWidth="11.4286" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="profile-info">
        <h2 className="profile-username">{formData.username}</h2>
        <div className="profile-meta">
          <span>{formatMajorYear(formData.major, formData.year)}</span>
          <span className="profile-meta-divider">·</span>
          <span>{savedCount} saved</span>
        </div>
        {formData.bio && <span className="profile-bio">{formData.bio}</span>}
      </div>

      <div className="profile-actions">
        <Link to="/edit-profile" className="edit-profile-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#043873" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#043873" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="edit-profile-text">Edit Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default ProfileInfo;
