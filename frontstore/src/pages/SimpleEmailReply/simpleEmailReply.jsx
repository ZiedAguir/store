import { useState } from 'react';
import apiRequest from '../../componnent/axios/axiosInstance';

function SimpleEmailReply() {
  const [formData, setFormData] = useState({
    userEmail: '',
    originalSubject: '',
    replyMessage: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

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
    setResult(null);

    try {
      const response = await apiRequest.post('/contact/forward-reply', formData);
      
      if (response.data.status === 'success') {
        setResult({ type: 'success', message: 'Reply sent successfully!' });
        // Reset form
        setFormData({
          userEmail: '',
          originalSubject: '',
          replyMessage: ''
        });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setResult({ type: 'error', message: 'Error sending reply. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-reply me-2"></i>
                Send Email Reply
              </h4>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">
                Use this form to send a reply to a user who contacted you through the contact form.
              </p>

              {/* Result Message */}
              {result && (
                <div className={`alert alert-${result.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                  <i className={`fas fa-${result.type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2`}></i>
                  {result.message}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setResult(null)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">
                    <i className="fas fa-envelope me-1"></i>
                    User's Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="userEmail"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    required
                  />
                  <div className="form-text">
                    The email address of the person who contacted you
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="originalSubject" className="form-label">
                    <i className="fas fa-tag me-1"></i>
                    Original Subject (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="originalSubject"
                    name="originalSubject"
                    value={formData.originalSubject}
                    onChange={handleChange}
                    placeholder="Question about your services"
                  />
                  <div className="form-text">
                    The subject line from the original contact form message
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="replyMessage" className="form-label">
                    <i className="fas fa-comment me-1"></i>
                    Your Reply *
                  </label>
                  <textarea
                    className="form-control"
                    id="replyMessage"
                    name="replyMessage"
                    rows="6"
                    value={formData.replyMessage}
                    onChange={handleChange}
                    placeholder="Type your reply here..."
                    required
                  />
                  <div className="form-text">
                    Your response to the user's inquiry
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending Reply...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Reply
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Instructions */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                How to Use
              </h5>
            </div>
            <div className="card-body">
              <ol>
                <li>
                  <strong>Check your email</strong> - You'll receive contact form messages at zieguir99@gmail.com
                </li>
                <li>
                  <strong>Copy the user's email</strong> - From the contact form message you received
                </li>
                <li>
                  <strong>Use this form</strong> - Enter the user's email and type your reply
                </li>
                <li>
                  <strong>Send</strong> - Your reply will be automatically sent to the user
                </li>
              </ol>
              
              <div className="alert alert-info mt-3">
                <i className="fas fa-lightbulb me-2"></i>
                <strong>Pro Tip:</strong> You can also reply directly to the email you received, 
                but using this form ensures the user gets a properly formatted response.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleEmailReply;
