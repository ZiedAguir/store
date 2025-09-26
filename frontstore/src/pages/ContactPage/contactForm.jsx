
import { useState } from 'react';
import apiRequest from '../../componnent/axios/axiosInstance';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await apiRequest.post('/contact', formData);
      
      if (response.data.status === 'success') {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          project: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          Your message has been sent successfully! We will get back to you soon.
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSubmitStatus(null)}
          ></button>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          Sorry, there was an error sending your message. Please try again later.
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSubmitStatus(null)}
          ></button>
        </div>
      )}

      <div className="row g-3">
        <div className="col-lg-12 col-xl-6">
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control bg-transparent border border-white" 
              id="name" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Your Name *</label>
          </div>
        </div>
        <div className="col-lg-12 col-xl-6">
          <div className="form-floating">
            <input 
              type="email" 
              className="form-control bg-transparent border border-white" 
              id="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Your Email *</label>
          </div>
        </div>
        <div className="col-lg-12 col-xl-6">
          <div className="form-floating">
            <input 
              type="tel" 
              className="form-control bg-transparent border border-white" 
              id="phone" 
              name="phone"
              placeholder="Phone" 
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="phone">Your Phone</label>
          </div>
        </div>
        <div className="col-lg-12 col-xl-6">
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control bg-transparent border border-white" 
              id="project" 
              name="project"
              placeholder="Project" 
              value={formData.project}
              onChange={handleChange}
            />
            <label htmlFor="project">Your Project</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control bg-transparent border border-white" 
              id="subject" 
              name="subject"
              placeholder="Subject" 
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <label htmlFor="subject">Subject *</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <textarea 
              className="form-control bg-transparent border border-white" 
              placeholder="Leave a message here" 
              id="message" 
              name="message"
              style={{height: 160}} 
              value={formData.message}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message *</label>
          </div>
        </div>
        <div className="col-12">
          <button 
            type="submit" 
            className="btn btn-light text-primary w-100 py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane me-2"></i>
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ContactForm;