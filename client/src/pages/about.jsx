import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import HeroComponent from '../components/HeroComponent/HeroComponent';
import AboutDescription from '../components/AboutDescription/AboutDescription';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import '../css/About.css';

export const About = () => {
  return (
    <div className="about-page">
      <NavigationBar />
      <HeroComponent />
      <AboutDescription />
      <BoardComponent />
      <div className="about-contact-cta">
        <div className="about-contact-cta-content">
          <h2 className="about-contact-cta-title">Have Questions?</h2>
          <p className="about-contact-cta-description">
            Want to add your club or need help? Visit our contact page!
          </p>
          <Link to="/contact-us" className="about-contact-cta-button">
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
