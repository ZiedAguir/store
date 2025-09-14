import { useContext, useState } from "react";
import { FormContext } from "../../context/AuthContext";

function Maps() {
    const {  customizationSettings } = useContext(FormContext);
    const selectedColor = customizationSettings.sidebarColor || "#000"; 
    const menuType = customizationSettings.menuType || "simple"; 
    const iconSize = menuType === "simple" ? "1rem" : "1.8rem";
    const [isMapsOpen, setMapsOpen] = useState(false);

    const togglePageMaps = () => {
        setMapsOpen(!isMapsOpen);
      };

    return (
        <li  className={`nav-parent ${isMapsOpen ? 'nav-expanded nav-active' : ''}`}>
  <a className="nav-link" href="#" onClick={togglePageMaps}>
    <i className="bx bx-map" aria-hidden="true" style={{ color: selectedColor, fontSize: iconSize }} />
    <span>Maps</span>
  </a>
  {isMapsOpen && (
    <ul className="nav nav-children">
    <li>
      <a className="nav-link" href="/MapsBasic">
        Basic
      </a>
    </li>
    <li>
      <a className="nav-link" href="#">
        Map Builder
      </a>
    </li>
  
  </ul>
  )}
  
</li>
    );
  }
  
  export default Maps;