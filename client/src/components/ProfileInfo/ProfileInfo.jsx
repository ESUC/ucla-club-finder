import { Link } from 'react-router-dom';
import './ProfileInfo.css';

const ProfileInfo = () => {
  return (
    <div className="profile-component">
      {/* main section */}
      <div className="profile-main">
        {/* profile picture */}
        <div className="profile-picture"> 
          <div className="profile-picture-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="138" height="138" viewBox="0 0 138 138" fill="none">
              <path d="M108.571 120V108.571C108.571 102.509 106.163 96.6955 101.876 92.4089C97.5895 88.1224 91.7757 85.7142 85.7136 85.7142H51.4279C45.3658 85.7142 39.552 88.1224 35.2655 92.4089C30.979 96.6955 28.5708 102.509 28.5708 108.571V120" stroke="white" strokeWidth="11.4286" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M68.572 62.8572C81.1956 62.8572 91.4291 52.6237 91.4291 40.0001C91.4291 27.3764 81.1956 17.1429 68.572 17.1429C55.9483 17.1429 45.7148 27.3764 45.7148 40.0001C45.7148 52.6237 55.9483 62.8572 68.572 62.8572Z" stroke="white" strokeWidth="11.4286" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {/* user */}
        <div className="profile-user">
          <h2 className="profile-username">costcosnumberonecustomer</h2>
          <div className="club-stats"> 
            <div className="club-saved">
              <span className="number-saved">20</span>
              <span className="stat-label">saved</span>
            </div>
            <div className="club-joined">
              <span className="number-joined">20</span>
              <span className="stat-label">joined</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* // description */}
      <div className="profile-description">
        <span className="profile-year">food engineering '99</span>
        <span className="profile-bio">i def like engineering 😋</span>
      </div>
      
      <Link to="/edit-profile" className="edit-profile-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M22.8572 41.9046C33.3769 41.9046 41.9048 33.3767 41.9048 22.8569C41.9048 12.3372 33.3769 3.80933 22.8572 3.80933C12.3375 3.80933 3.80957 12.3372 3.80957 22.8569C3.80957 33.3767 12.3375 41.9046 22.8572 41.9046Z" stroke="#043873" strokeWidth="3.80952" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.8569 15.238V22.8571" stroke="#043873" strokeWidth="3.80952" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.8569 30.4758H22.8761" stroke="#043873" strokeWidth="3.80952" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="edit-profile-text">Edit Profile</span>
      </Link>
    </div>
  );
}

export default ProfileInfo;
