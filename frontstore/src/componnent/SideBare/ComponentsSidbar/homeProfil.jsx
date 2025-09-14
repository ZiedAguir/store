import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FormContext } from "../../context/AuthContext";

function HomePages2() {
   const {  customizationSettings } = useContext(FormContext);
   const selectedColor = customizationSettings.sidebarColor || "#000"; 
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const menuType = customizationSettings.menuType || "simple"; 
  const iconSize = menuType === "simple" ? "1rem" : "1.8rem";


  const togglePages = () => {
    setIsPagesOpen(!isPagesOpen);
  };
    return (
      <li className={`nav-parent ${isPagesOpen ? 'nav-expanded nav-active' : ''}`}>
      <a className="nav-link" href="#" onClick={togglePages}>
        <i style={{ color: selectedColor, fontSize: iconSize }}>
          <FaHome/>
          </i>
        <span>HomeProfile</span>
      </a>
      
      {isPagesOpen && (
        <ul className="nav nav-children">
          <li>
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
          <li>
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          <li>
            <a className="nav-link" href="/RecoverPassword">
              Recover Password
            </a>
          </li>
          <li>
            <a className="nav-link" href="/LockedScreen">
              Locked Screen
            </a>
          </li>
          <li>
            <a className="nav-link" href="/UserProfil">
              User Profile
            </a>
          </li>
          <li>
            <a className="nav-link" href="/InvoicePage">
              Invoice
            </a>
          </li>
          <li>
            <a className="nav-link" href="/Page_400">
              404
            </a>
          </li>
          <li>
            <a className="nav-link" href="/Page_500">
              500
            </a>
          </li>
        </ul>
      )}
    </li>
    );
  }
  
  export default HomePages2;