
import Elements from "./ComponentSummaryPage.jsx/elements";
import MoreComponent from "./ComponentSummaryPage.jsx/moreComponent";
import StatusComponent from "./ComponentSummaryPage.jsx/status";
import AiFillStarComponent from "./ComponentSummaryPage.jsx/raiting";
import { useContext } from "react";
import { FormContext } from "../context/AuthContext";

function HeaderSummaryPage() {
  const { customizationSettings } = useContext(FormContext);
  return (
    <section role="main" className="content-body" >
      <header className="page-header" >
        {/* start: header */}
        <header className="header header-nav-menu" style={{ backgroundColor: customizationSettings.headerSumaryColor, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <div className="logo-container">
            {/* start: header nav menu */}
            <div className="header-nav collapse" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
              <div className="header-nav-main header-nav-main-effect-1 header-nav-main-sub-effect-1" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                <nav>
                  <ul className="nav nav-pills" id="mainNav" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap' }}>
                    <li>
                      <a className="nav-link" href="/dashbordpage">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="#">
                        Stripe
                      </a>
                    </li>

                    <li className="dropdown active">
                      <a className="nav-link dropdown-toggle" href="#">
                        Layouts
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="nav-link" href="#">
                            Landing Page
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="layouts-default.html">
                            Default
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="#">
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

          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap' }}>
            <div className="nav-form d-none d-xl-inline-block">
              <StatusComponent />
            </div>

            <span className="separator" />
            <AiFillStarComponent/>
          </div>
        </header>
        {/* end: header */}
      </header>
    </section>
  );
}

export default HeaderSummaryPage;

