import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import HeroComponent from '../components/HeroComponent/HeroComponent';
import AboutDescription from '../components/AboutDescription/AboutDescription';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import ContactUs from '../components/ContactUs/ContactUs';
import '../css/About.css';

export const About = () => {
  return (
    <div className="about-page">
      <NavigationBar />
      <HeroComponent />
      <AboutDescription />
      <BoardComponent />
      <ContactUs />
      <Footer />
    </div>
  );
};
