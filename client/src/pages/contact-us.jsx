import { useState } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import './ContactUsPage.css';

export const ContactUs = () => {
  const [addClubData, setAddClubData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    clubName: '',
    clubDescription: '',
    clubWebsite: '',
    clubSocialMedia: '',
    message: '',
  });

  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleAddClubChange = (e) => {
    const { name, value } = e.target;
    setAddClubData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClubSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to submit club addition request
    console.log('Add Club Form submitted:', addClubData);
    // Reset form or show success message
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to submit contact form
    console.log('Contact Form submitted:', contactData);
    // Reset form or show success message
  };

  return (
    <div className="contact-us-page">
      <NavigationBar />
      <div className="contact-us-content">
        <div className="contact-us-header">
          <h1 className="contact-us-title">Contact Us</h1>
          <p className="contact-us-subtitle">
            Have questions or want to add your club? We're here to help!
          </p>
        </div>

        {/* Add a Club Section */}
        <section className="contact-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="section-title">Add a Club</h2>
            <p className="section-description">
              Want to add your club to ClubFinder? Fill out the form below and we'll get back to you!
            </p>
          </div>
          <form className="contact-form" onSubmit={handleAddClubSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={addClubData.firstName}
                onChange={handleAddClubChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={addClubData.lastName}
                onChange={handleAddClubChange}
                className="form-input"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={addClubData.email}
              onChange={handleAddClubChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="clubName"
              placeholder="Club Name"
              value={addClubData.clubName}
              onChange={handleAddClubChange}
              className="form-input"
              required
            />
            <textarea
              name="clubDescription"
              placeholder="Club Description"
              value={addClubData.clubDescription}
              onChange={handleAddClubChange}
              className="form-textarea"
              rows="4"
              required
            />
            <input
              type="url"
              name="clubWebsite"
              placeholder="Club Website (optional)"
              value={addClubData.clubWebsite}
              onChange={handleAddClubChange}
              className="form-input"
            />
            <input
              type="text"
              name="clubSocialMedia"
              placeholder="Social Media Handle (optional)"
              value={addClubData.clubSocialMedia}
              onChange={handleAddClubChange}
              className="form-input"
            />
            <textarea
              name="message"
              placeholder="Additional Information (optional)"
              value={addClubData.message}
              onChange={handleAddClubChange}
              className="form-textarea"
              rows="3"
            />
            <button type="submit" className="form-button">Submit Club Request</button>
          </form>
        </section>

        {/* General Contact Section */}
        <section className="contact-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h2 className="section-title">General Contact</h2>
            <p className="section-description">
              Having trouble with login, your account, or have any other questions? Send us a message!
            </p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={contactData.firstName}
                onChange={handleContactChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={contactData.lastName}
                onChange={handleContactChange}
                className="form-input"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contactData.email}
              onChange={handleContactChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={contactData.subject}
              onChange={handleContactChange}
              className="form-input"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={contactData.message}
              onChange={handleContactChange}
              className="form-textarea"
              rows="6"
              required
            />
            <button type="submit" className="form-button">Send Message</button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;

