function Elements() {
  

    return (
        <li className="dropdown dropdown-mega">
        <a className="nav-link dropdown-toggle" href="#"> Elements</a>
        <ul className="dropdown-menu">
          <li>
            <div className="dropdown-mega-content">
              <div className="row">
                
                <div className="col-lg-3">
                  <ul className="dropdown-mega-sub-nav">
                    <li>
                      <a className="nav-link" href="ui-elements-sliders.html">
                        Sliders
                      </a>
                    </li>
                  
                   
                    <li>
                      <a className="nav-link" href="ui-elements-toggles.html">
                        Toggles
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="ui-elements-nestable.html">
                        Nestable
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="ui-elements-tree-view.html">
                        Tree View
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="ui-elements-scrollable.html">
                        Scrollable
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="ui-elements-grid-system.html">
                        Grid System
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className="dropdown-mega-sub-nav">
                    <li>
                      <a className="nav-link" href="ui-elements-charts.html">
                        Charts
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="#">
                        Animations <span className="mega-sub-nav-toggle toggled float-end" data-toggle="collapse" data-target=".mega-sub-nav-sub-menu-2" />
                      </a>
                      <ul className="dropdown-mega-sub-nav mega-sub-nav-sub-menu-2 collapse">
                        <li>
                          <a className="nav-link" href="ui-elements-animations-appear.html">
                            Appear
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="ui-elements-animations-hover.html">
                            Hover
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="nav-link" href="#">
                        Loading <span className="mega-sub-nav-toggle toggled float-end" data-toggle="collapse" data-target=".mega-sub-nav-sub-menu-3" />
                      </a>
                      <ul className="dropdown-mega-sub-nav mega-sub-nav-sub-menu-3 collapse">
                        <li>
                          <a className="nav-link" href="ui-elements-loading-overlay.html">
                            Overlay
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="ui-elements-loading-progress.html">
                            Progress
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="nav-link" href="ui-elements-extra.html">
                        Extra
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    );
  }
  
  export default Elements;