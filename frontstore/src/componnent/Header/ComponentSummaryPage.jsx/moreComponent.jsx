function MoreComponent() {
  

    return (
        <li className="dropdown">
        <a href="#" className="nav-link dropdown-toggle">More</a>
        <ul className="dropdown-menu">
          <li className="dropdown-submenu">
            <a className="nav-link" href="#">
              Maps
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="nav-link" href="maps-google-maps.html">
                  Basic
                </a>
              </li>
              <li>
                <a className="nav-link" href="maps-google-maps-builder.html">
                  Map Builder
                </a>
              </li>
              <li>
                <a className="nav-link" href="maps-vector.html">
                  Vector
                </a>
              </li>
            </ul>
          </li>
         
         
          
          <li className="dropdown-submenu">
            <a className="nav-link" href="#">
              Tables
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="nav-link" href="tables-basic.html">
                  Basic
                </a>
              </li>
              <li>
                <a className="nav-link" href="tables-advanced.html">
                  Advanced
                </a>
              </li>
              <li>
                <a className="nav-link" href="tables-responsive.html">
                  Responsive
                </a>
              </li>
              <li>
                <a className="nav-link" href="tables-editable.html">
                  Editable
                </a>
              </li>
             
              
            </ul>
          </li>
         
          <li>
            <a className="nav-link" href="#">
              URL:<span className="tip tip-dark">hot</span><em className="not-included">(Not Included)</em>
            </a>            
          </li>
          <li>
            <a className="nav-link" href="#">
              Changelog
            </a>            
          </li>
        </ul>
      </li>
    );
  }
  
  export default MoreComponent;