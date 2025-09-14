function Projects() {
    

    return (
    <>
     <div className="sidebar-widget widget-tasks">
            <div className="widget-header">
              <h6>Projects</h6>
              <div className="widget-toggle">+</div>
            </div>
            <div className="widget-content">
              <ul className="list-unstyled m-0">
                <li><a href="#">LuxeShowcase</a></li>
                <li><a href="#">VisualizeIt</a></li>
                <li><a href="#">VistaVitrine</a></li>
              </ul>
            </div>
          </div>
          <hr className="separator" />
          <div className="sidebar-widget widget-stats">
            <div className="widget-header">
              <h6>Company Stats</h6>
              <div className="widget-toggle">+</div>
            </div>
            <div className="widget-content">
              <ul>
                <li>
                  <span className="stats-title">Stat 1</span>
                  <span className="stats-complete">85%</span>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary progress-without-number" role="progressbar" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100} style={{width: '85%'}}>
                      <span className="sr-only">85% Complete</span>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="stats-title">Stat 2</span>
                  <span className="stats-complete">70%</span>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary progress-without-number" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} style={{width: '70%'}}>
                      <span className="sr-only">70% Complete</span>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="stats-title">Stat 3</span>
                  <span className="stats-complete">2%</span>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary progress-without-number" role="progressbar" aria-valuenow={2} aria-valuemin={0} aria-valuemax={100} style={{width: '2%'}}>
                      <span className="sr-only">2% Complete</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div> 
    </>
    );
  }
  
  export default Projects;