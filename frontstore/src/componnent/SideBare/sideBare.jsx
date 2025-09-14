import { MdOutlineDomainAdd, MdOutlineHttp, MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneVolume, FaRegAddressCard } from "react-icons/fa6";
import ListVitrine2 from "./ComponentsSidbar/listVitrine";
import Pages from "./ComponentsSidbar/pages";
import HomePages2 from "./ComponentsSidbar/homeProfil";
import Maps from "./ComponentsSidbar/maps";
import Projects from "./ComponentsSidbar/Projects";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/AuthContext";
import "./sidbar.css"
function SideBar() {
  const { formData, customizationSettings } = useContext(FormContext);
  const selectedColor = customizationSettings.sidebarColor || "#000"; 
  const [sidebarStyle, setSidebarStyle] = useState({ backgroundColor: "#000" });
  const menuType = customizationSettings.menuType || "simple"; 
  const iconSize = menuType === "simple" ? "1rem" : "1.8rem";

  useEffect(() => {
    if (customizationSettings.sidebarBackgroundColor) {
      setSidebarStyle({ backgroundColor: customizationSettings.sidebarBackgroundColor });
    }
  }, [customizationSettings.sidebarBackgroundColor]);
  
  const slogan = formData.step2?.slogan || "Aucun slogan défini"; 
  const domain = formData.step2?.domain || "Aucun domain défini";
  const phone = formData.step1?.phone || "Aucun phone défini";
  const email = formData.step1?.email || "Aucun email défini";
  const address = formData.step1?.address || "Aucun address défini";

  return (
    <div className={`sidebar sidebar-${customizationSettings.sidebarSize}`}>
<section className="body" style={sidebarStyle}>
      <div className="inner-wrapper" >
        <aside id="sidebar-left" className="sidebar-left" style={sidebarStyle}>
          <div className="sidebar-header"  >
            <div className="sidebar-title"style={sidebarStyle}>Navigation</div>
            <div
              style={{ backgroundColor: "white", borderTopLeftRadius: "1rem" }}
              className="sidebar-toggle d-none d-md-block"
              data-toggle-class="sidebar-left-collapsed"
              data-target="html"
              data-fire-event="sidebar-left-toggle"
            >
              <i className="fas fa-bars" aria-label="Toggle sidebar" />
            </div>
          </div>
          <div className="nano"style={sidebarStyle}>
            <div className="nano-content">
              <nav id="menu" className="nav-main" role="navigation">
                <ul className="nav nav-main">
                  <li>
                    <a className="nav-link" href="/">
                      <i className="bx bx-home-alt" aria-hidden="true" style={{ color: selectedColor, fontSize: iconSize }} />
                      <span>Astra_Store</span>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/summaryPage">
                      <i className="bx bxl-sketch" aria-hidden="true" style={{ color: selectedColor, fontSize: iconSize }} />
                      <span>SummaryPage</span>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#">
                      <i style={{ color: selectedColor, fontSize: iconSize }}>
                        <MdMarkEmailUnread />
                      </i>
                      <span>{email}</span>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#">
                      <i style={{ color: selectedColor, fontSize: iconSize }}>
                        <FaPhoneVolume />
                      </i>
                      <span>{phone}</span>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#">
                      <i style={{ color: selectedColor, fontSize: iconSize }}>
                        <FaRegAddressCard />
                      </i>
                      <span>{address}</span>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#">
                      <i style={{ color: selectedColor, fontSize: iconSize }}>
                        <MdOutlineHttp />
                      </i>
                      <span>{slogan}</span>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#">
                      <i style={{ color: selectedColor, fontSize: iconSize }}>
                        <MdOutlineDomainAdd />
                      </i>
                      <span>{domain}</span>
                    </a>
                  </li>
                  <ListVitrine2 />
                  <Pages />
                  <HomePages2 />
                  <Maps />
                </ul>
              </nav>
              <hr className="separator" />
              <Projects />
            </div>
          </div>
        </aside>
      </div>
    </section>
    </div>
    
  );
}

export default SideBar;



