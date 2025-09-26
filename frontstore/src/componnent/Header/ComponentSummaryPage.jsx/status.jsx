import { useContext, useState } from "react";
import { FormContext } from "../../context/AuthContext";

function StatusComponent() {
  const { formData, setFormData } = useContext(FormContext); // Importer les données du contexte
  const initialStatus = formData.step1?.status || "active"; // Statut initial
  const [status, setStatus] = useState(initialStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsDropdownOpen(false); // Fermer le dropdown après sélection

    // Mettre à jour le contexte avec le nouveau statut
    setFormData((prevData) => ({
      ...prevData,
      step1: {
        ...prevData.step1,
        status: newStatus,
      },
    }));
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="statusbox dropdown">
      <a 
        href="#" 
        onClick={toggleDropdown}
        className={`nav-link ${isDropdownOpen ? 'show' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          backgroundColor: isDropdownOpen ? '#007bff' : 'transparent',
          color: isDropdownOpen ? 'white' : '#495057',
          textDecoration: 'none',
          border: '1px solid transparent'
        }}
      >
        <span className="status-info">
          <strong>Status:</strong>
        </span>
        <span className="status-value">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotated' : ''}`} 
           style={{ 
             transition: 'transform 0.3s ease',
             transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
           }} />
      </a>
      
      {isDropdownOpen && (
        <>
          <div 
            className="dropdown-backdrop" 
            onClick={closeDropdown}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
          />
          <div 
            className="dropdown-menu show"
            style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              minWidth: '160px',
              padding: '8px 0'
            }}
          >
            <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
              <li>
                <a
                  role="menuitem"
                  tabIndex={-1}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleStatusChange("active");
                  }}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    color: '#495057',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.color = '#007bff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#495057';
                  }}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  role="menuitem"
                  tabIndex={-1}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleStatusChange("maintenance");
                  }}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    color: '#495057',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.color = '#007bff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#495057';
                  }}
                >
                  In Maintenance
                </a>
              </li>
              <li>
                <a
                  role="menuitem"
                  tabIndex={-1}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleStatusChange("inactive");
                  }}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    color: '#495057',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.color = '#007bff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#495057';
                  }}
                >
                  Inactive
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default StatusComponent;
