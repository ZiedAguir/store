
import Elements from "./ComponentSummaryPage.jsx/elements";
import MoreComponent from "./ComponentSummaryPage.jsx/moreComponent";
import StatusComponent from "./ComponentSummaryPage.jsx/status";
import AiFillStarComponent from "./ComponentSummaryPage.jsx/raiting";
import { useContext } from "react";
import { FormContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function HeaderSummaryPage() {
  const { customizationSettings } = useContext(FormContext);
  return (
    <section role="main" className="content-body">
      <header className="page-header">
        {/* start: header */}
        <header 
          className="header header-nav-menu" 
          style={{ 
            backgroundColor: customizationSettings.headerSumaryColor || '#ffffff',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'nowrap',
            minHeight: '60px'
          }}
        >
          <div className="logo-container">
            {/* start: header nav menu */}
            <div className="header-nav">
              <div className="header-nav-main">
                <nav>
                  <ul className="nav nav-pills" id="mainNav">
                    <li>
                      <Link className="nav-link" to="/dashbordpage">
                        <i className="bx bx-home-alt me-1"></i>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <a className="nav-link" href="#">
                        <i className="bx bx-credit-card me-1"></i>
                        Stripe
                      </a>
                    </li>
                    <li className="dropdown active">
                      <a className="nav-link dropdown-toggle" href="#">
                        <i className="bx bx-layout me-1"></i>
                        Layouts
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="nav-link" href="#">
                            <i className="bx bx-home-circle me-1"></i>
                            Landing Page
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="layouts-default.html">
                            <i className="bx bx-grid-alt me-1"></i>
                            Default
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="#">
                            <i className="bx bx-palette me-1"></i>
                            Modern
                          </a>
                        </li>
                      </ul>
                    </li>
                    <Elements />
                    <MoreComponent />
                  </ul>
                </nav>
              </div>
            </div>
            {/* end: header nav menu */}
          </div>

          <div className="header-right">
            <div className="nav-form">
              <StatusComponent />
            </div>
            <span className="separator" />
            <div className="rating-container">
              <AiFillStarComponent/>
            </div>
          </div>
        </header>
        {/* end: header */}
      </header>
    </section>
  );
}

export default HeaderSummaryPage;

