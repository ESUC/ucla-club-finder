import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../config';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    clubName: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      clubName: formData.clubName.trim(),
      message: formData.message.trim(),
    };

    if (!payload.email || !payload.message) {
      setStatus({ type: 'error', message: 'Please enter your email and a message.' });
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${API_BASE}/api/users/contact`, payload);
      setStatus({ type: 'success', message: 'Message sent! We will get back to you soon.' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        clubName: '',
        message: '',
      });
    } catch (err) {
      const data = err?.response?.data;
      const apiErrors = data?.errors;
      const general =
        (apiErrors && (apiErrors.general || apiErrors.email || apiErrors.message)) ||
        data?.error ||
        err?.message;
      setStatus({
        type: 'error',
        message: general || 'Failed to send message. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <div className="contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          Want to add your club to the ClubFinder app? Having trouble with login or your account? Any questions? We're here to help!
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="text"
          name="clubName"
          placeholder="Club Name (optional)"
          value={formData.clubName}
          onChange={handleInputChange}
          className="form-input"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          className="form-textarea"
          rows="4"
        />
        {status && (
          <p className={`contact-status contact-status-${status.type}`}>
            {status.message}
          </p>
        )}

        <button type="submit" className="form-button" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </section>
  );
};

export default ContactUs;

