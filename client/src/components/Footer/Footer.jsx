import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-heading">Clubfinder</h3>
          <p className="footer-description">
            Clubfinder helps students discover and connect with clubs and organizations. Join a community and make the most of your college experience.
          </p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Pages</h3>
          <ul className="footer-links">
            <li><Link to="/home" className="footer-link">Home</Link></li>
            <li><Link to="/home" className="footer-link">Clubs</Link></li>
            <li><Link to="/auth/login" className="footer-link">Account</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li><a href="https://esuc.ucla.edu" target="_blank" rel="noopener noreferrer" className="footer-link">ESUC Website</a></li>
            <li><a href="https://samueli.ucla.edu/" target="_blank" rel="noopener noreferrer" className="footer-link">UCLA Henry Samueli School of Engineering</a></li>
            <li><a href="https://www.seasoasa.ucla.edu/studentleaderguide-2025-2026/" target="_blank" rel="noopener noreferrer" className="footer-link">Student Leaders Guide</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Connect With Us</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Instagram</a></li>
            <li><a href="#" className="footer-link">Linkedin</a></li>
            <li><a href="#" className="footer-link">Discord</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <div className="footer-language">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>English</span>
        </div>
        <div className="footer-copyright">
          ©2025 ESUC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

