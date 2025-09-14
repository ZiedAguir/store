import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/AuthContext";

function ProfilInfo() {
    const { currentUser, logout } = useContext(FormContext);
    
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
  
    if (!currentUser || !currentUser.data) {
      return <div>Loading...</div>;
    }
  
    const { name, role, email,profileImg } = currentUser.data;
  
    return (
      <div id="userbox" className="userbox">
        <a href="#" data-bs-toggle="dropdown">
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
        <div className="dropdown-menu">
          <ul className="list-unstyled mb-2">
            <li className="divider" />
            <li>
              <a role="menuitem" tabIndex={-1} href="/UserProfil">
                <i className="bx bx-user-circle" /> My Profile
              </a>
            </li>
            <li>
              <a role="menuitem" tabIndex={-1} href="/LockedScreen" data-lock-screen="true">
                <i className="bx bx-lock" /> Lock Screen
              </a>
            </li>
            <li>
              <a role="menuitem" tabIndex={-1} href="#" onClick={handleLogout}>
                <i className="bx bx-power-off" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default ProfilInfo;
  