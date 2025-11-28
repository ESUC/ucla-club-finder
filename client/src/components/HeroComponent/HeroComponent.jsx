import { Link } from 'react-router-dom';
import './HeroComponent.css';

const HeroComponent = () => {
  return (
    <section className="hero-section">
      <div className="hero-graphic">
        <img src="/lines.svg" alt="" className="hero-waves" />
      </div>
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">ClubFinder Platform</h1>
            <p className="hero-description">
              Connecting UCLA students to Engineering clubs and organizations
            </p>
          </div>
          <Link to="/auth/register" className="hero-button">
            Create an Account
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="hero-attribution">Created by Engineering Society @ UCLA</p>
        </div>
        <div className="hero-logo">
          <img src="/esuc-logo.png" alt="ESUC Logo" className="hero-logo-image" />
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;

