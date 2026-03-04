import { useState, useEffect } from 'react';
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
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      clubName: formData.clubName.trim(),
      message: formData.message.trim(),
    };

    if (!payload.email || !payload.message) {
      setToast({ type: 'error', message: 'Please enter your email and a message.' });
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${API_BASE}/api/users/contact`, payload);
      setToast({ type: 'success', message: 'Message sent! We\'ll get back to you soon.' });
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
      setToast({
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
        <button type="submit" className="form-button" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>

      {toast && (
        <div className={`contact-toast contact-toast-${toast.type}`}>
          <span className="contact-toast-icon">
            {toast.type === 'success' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            )}
          </span>
          <span className="contact-toast-message">{toast.message}</span>
          <button className="contact-toast-close" onClick={() => setToast(null)} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default ContactUs;

