import { useContext } from "react";
import { FormContext } from "../../../componnent/context/AuthContext";

function InfoProfil() {
      const { currentUser } = useContext(FormContext);
  // Check if currentUser exists
  if (!currentUser || !currentUser.data) {
    return <div>Loading...</div>;
  }

  const { name, role, phone, email, profileImg, addresseProfil, about } = currentUser.data;
  
  // Debug: Log user data to see what's available (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Current user data:', currentUser.data);
    console.log('Profile image:', profileImg);
  }

    return (
        <section className="card">
        <div className="card-body">
          <div className="thumb-info mb-3">
            <div className="profile-image-container" style={{ 
              position: 'relative', 
              display: 'inline-block',
              width: '120px',
              height: '120px',
              margin: '0 auto',
              display: 'block'
            }}>
              <img
                src={profileImg || "img/avatar.jpg"} 
                alt="avatar"
                className="rounded img-fluid"
                data-lock-picture={profileImg || "img/avatar.jpg"}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '4px solid #fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                onError={(e) => {
                  if (process.env.NODE_ENV === 'development') {
                    console.log('Image failed to load, using fallback');
                  }
                  e.target.src = "img/avatar.jpg";
                }}
              />
              {/* Change photo button */}
              <div 
                className="change-photo-btn"
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
                title="Change profile photo"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0056b3';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#007bff';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <i className="fas fa-camera"></i>
              </div>
            </div>
            <div className="thumb-info-title text-center mt-3">
              <span className="thumb-info-inner d-block" style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50' }}>
                {name || "Guest User"}
              </span>
              <span className="thumb-info-type d-block" style={{ fontSize: '14px', color: '#6c757d', textTransform: 'capitalize' }}>
                {role || "User"}
              </span>
            </div>
          </div>
          <div className="widget-toggle-expand mb-3">
            <div className="widget-content-expanded">
              <ul className="simple-todo-list mt-3">
                <li>
                  <span className=" font-weight-semibold text-dark">
                    Email:
                  </span>{" "}
                  {email || "Unknown"}
                </li>
                <li>
                  <span className=" font-weight-semibold text-dark">
                    Phone:
                  </span>{" "}
                  {phone || "Unknown"}
                </li>
                <li>
                  <span className=" font-weight-semibold text-dark">
                    Addresse:{" "}
                  </span>{" "}
                  {addresseProfil || "Unknown"}
                </li>
              </ul>
            </div>
          </div>
          <hr className="dotted short" />
          <h5 className="mb-2 mt-3">About</h5>
          <p className="text-2">
          {about || "web developer with a proven ability to adapt in both self-starting and collaborative environments while staying focused on achieving high- quality results under strictdeadlines"}
            
          </p>
          <div className="clearfix">
            <a className="text-uppercase text-muted float-end" href="#">
              (View All)
            </a>
          </div>
          <hr className="dotted short" />
          <div className="social-icons-list">
            <a
              rel="tooltip"
              data-bs-placement="bottom"
              target="_blank"
              href="http://www.facebook.com"
              data-original-title="Facebook"
            >
              <i className="fab fa-facebook-f" />
              <span>Facebook</span>
            </a>
            <a
              rel="tooltip"
              data-bs-placement="bottom"
              href="http://www.twitter.com"
              data-original-title="Twitter"
            >
              <i className="fab fa-twitter" />
              <span>Twitter</span>
            </a>
            <a
              rel="tooltip"
              data-bs-placement="bottom"
              href="http://www.linkedin.com"
              data-original-title="Linkedin"
            >
              <i className="fab fa-linkedin-in" />
              <span>Linkedin</span>
            </a>
          </div>
        </div>
      </section>

    );
  }
  
  export default InfoProfil;