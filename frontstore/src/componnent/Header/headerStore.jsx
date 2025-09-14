function HeaderStore() {
  return (
    <div>
      <header
        id="header"
        className="header header-nav-links header-nav-menu "
        data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': false, 'stickyEnableOnMobile': true, 'stickyStartAt': 70, 'stickyChangeLogo': false, 'stickyHeaderContainerHeight': 70}"
      >
        <div className="header-body border-top-0 bg-dark box-shadow-none">
          <div className="header-container container h-100">
            <div className="header-row h-100">
              <div className="header-column">
                <div className="header-row">
                  <div className="header-logo">
                    <a href="/" className="goto-top">
                      <h2
                        style={{ color: "#0CA7B7" }}
                        width={102}
                        height={20}
                        data-sticky-width={82}
                        data-sticky-height={36}
                        data-sticky-top={0}
                      >
                        Astra Store
                      </h2>
                    </a>
                  </div>
                </div>
              </div>
              <div className="header-column justify-content-end">
                <div className="header-row">
                  <button
                    className="btn header-btn-collapse-nav d-lg-none order-3 mt-0 ms-3 me-0"
                    data-bs-toggle="collapse"
                    data-bs-target=".header-nav"
                  >
                    <i className="fas fa-bars" />
                  </button>

                  {/* start: header nav menu */}
                  <div className="header-nav header-nav-links header-nav-light-text header-nav-dropdowns-dark collapse">
                    <div className="header-nav-main header-nav-main-mobile-dark header-nav-main-effect-1 header-nav-main-sub-effect-1">
                      <nav>
                        <ul className="nav nav-pills" id="mainNav">
                          
                          {/* 🔹 Login */}
                          <li>
                            <a className="nav-link" href="/login">
                              <i className="fas fa-sign-in-alt me-1"></i> Login
                            </a>
                          </li>

                          {/* 🔹 Register */}
                          <li>
                            <a className="nav-link" href="/register">
                              <i className="fas fa-user-plus me-1"></i> Register
                            </a>
                          </li>

                          {/* 🔹 MyTemplates */}
                          <li>
                            <a
                              className="nav-link"
                              href="#demos"
                              data-hash
                              data-hash-offset={120}
                            >
                              MyTemplates
                            </a>
                          </li>

                          {/* Dropdown Layouts */}
                          <li className="dropdown">
                            <a className="nav-link dropdown-toggle" href="">
                              Layouts
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="nav-link" href="/">
                                  Landing Page
                                </a>
                              </li>
                              <li>
                                <a className="nav-link" href="#">
                                  Stripe
                                </a>
                              </li>
                            </ul>
                          </li>

                          {/* Dropdown Pages */}
                          <li className="dropdown">
                            <a className="nav-link dropdown-toggle" href="#">
                              Pages
                            </a>
                            <ul className="dropdown-menu">
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
                                <a className="nav-link" href="/aboutuspage">
                                  About us
                                </a>
                              </li>
                              <li>
                                <a className="nav-link" href="/faqpage">
                                  FQA
                                </a>
                              </li>
                              <li>
                                <a className="nav-link" href="/contactuspage">
                                  Contact Us
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
                          </li>

                          {/* Dropdown Apps */}
                          <li className="dropdown">
                            <a className="nav-link dropdown-toggle" href="#">
                              Apps
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="nav-link"
                                  href="ecommerce-dashboard.html"
                                >
                                  eCommerce
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  href="mailbox-folder.html"
                                >
                                  Mailbox
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  {/* end: header nav menu */}

                  <a
                    href="/step1"
                    className="btn btn-gradient btn-modern btn-rounded text-3 ms-4 d-none d-sm-block"
                  >
                    CREATE A NEW SITE VITRINE!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderStore;
