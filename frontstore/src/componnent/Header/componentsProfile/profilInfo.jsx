import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "../../context/AuthContext";

function ProfilInfo() {
    const { currentUser, logout, isLoading } = useContext(FormContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/login");
      } catch (err) {
        console.error("Logout failed", err);
        // Still navigate to login even if logout API fails
        navigate("/login");
      }
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
      setIsDropdownOpen(false);
    };
  
    // Show loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    // Show login/register links if no user
    if (!currentUser || !currentUser.data) {
      return (
        <div className="header-nav-links">
          <Link className="nav-link" to="/login">
            <i className="fas fa-sign-in-alt me-1"></i> Login
          </Link>
          <Link className="nav-link" to="/register">
            <i className="fas fa-user-plus me-1"></i> Register
          </Link>
        </div>
      );
    }
  
    const { name, role, email,profileImg } = currentUser.data;
  
    return (
      <div id="userbox" className="userbox" style={{ position: 'relative' }}>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown();
          }}
          style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'block'
          }}
        >
          <figure className="profile-picture">
            <img
              src={profileImg || "img/avatar.jpg"} 
              alt="avatar"
              className="rounded-circle"
              data-lock-picture={profileImg || "img/avatar.jpg"}
            />
          </figure>
          <div className="profile-info" data-lock-name={name || "Unknown"} data-lock-email={email || "Unknown"}>
            <span className="name">{name || "Guest User"}</span>
            <span className="role">{role || "User"}</span>
          </div>
          <i className="fa custom-caret" />
        </a>
        
        {isDropdownOpen && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 998
              }}
              onClick={closeDropdown}
            />
            
            {/* Dropdown menu */}
            <div 
              className="dropdown-menu" 
              style={{ 
                display: 'block', 
                position: 'absolute',
                right: 0,
                top: '100%',
                zIndex: 999,
                minWidth: '200px',
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                padding: '0.5rem 0'
              }}
            >
              <ul className="list-unstyled mb-2">
                <li className="divider" />
                <li>
                  <Link 
                    role="menuitem" 
                    tabIndex={-1} 
                    to="/UserProfil"
                    onClick={closeDropdown}
                    style={{ 
                      display: 'block', 
                      padding: '0.5rem 1rem', 
                      textDecoration: 'none', 
                      color: '#495057',
                      transition: 'background-color 0.15s ease-in-out'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <i className="bx bx-user-circle" style={{ marginRight: '0.5rem' }} /> My Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    role="menuitem" 
                    tabIndex={-1} 
                    to="/LockedScreen" 
                    data-lock-screen="true"
                    onClick={closeDropdown}
                    style={{ 
                      display: 'block', 
                      padding: '0.5rem 1rem', 
                      textDecoration: 'none', 
                      color: '#495057',
                      transition: 'background-color 0.15s ease-in-out'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <i className="bx bx-lock" style={{ marginRight: '0.5rem' }} /> Lock Screen
                  </Link>
                </li>
                <li>
                  <button 
                    role="menuitem" 
                    tabIndex={-1} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      closeDropdown();
                    }}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '0.5rem 1rem', 
                      color: '#495057',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease-in-out'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <i className="bx bx-power-off" style={{ marginRight: '0.5rem' }} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default ProfilInfo;
  