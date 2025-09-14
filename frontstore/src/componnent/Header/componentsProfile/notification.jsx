function Notification() {
  

    return (
        <ul className="notifications">
        <li>
          <a href="#" className="dropdown-toggle notification-icon" data-bs-toggle="dropdown">
            <i className="bx bx-list-ol" />
            <span className="badge">3</span>
          </a>
          <div className="dropdown-menu notification-menu large">
            <div className="notification-title">
              <span className="float-end badge badge-default">3</span>
              Tasks
            </div>
            <div className="content">
              <ul>
                <li>
                  <p className="clearfix mb-1">
                    <span className="message float-start">Generating Sales Report</span>
                    <span className="message float-end text-dark">60%</span>
                  </p>
                  <div className="progress progress-xs light">
                    <div className="progress-bar" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                  </div>
                </li>
                <li>
                  <p className="clearfix mb-1">
                    <span className="message float-start">Importing Contacts</span>
                    <span className="message float-end text-dark">98%</span>
                  </p>
                  <div className="progress progress-xs light">
                    <div className="progress-bar" role="progressbar" aria-valuenow={98} aria-valuemin={0} aria-valuemax={100} style={{width: '98%'}} />
                  </div>
                </li>
                <li>
                  <p className="clearfix mb-1">
                    <span className="message float-start">Uploading something big</span>
                    <span className="message float-end text-dark">33%</span>
                  </p>
                  <div className="progress progress-xs light mb-1">
                    <div className="progress-bar" role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100} style={{width: '33%'}} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <a href="#" className="dropdown-toggle notification-icon" data-bs-toggle="dropdown">
            <i className="bx bx-envelope" />
            <span className="badge">4</span>
          </a>
          <div className="dropdown-menu notification-menu">
            <div className="notification-title">
              <span className="float-end badge badge-default">230</span>
              Messages
            </div>
            <div className="content">
            <ul className="simple-user-list mb-3">
                <li>
                  <figure className="image rounded">
                    <img src="img/landing/ahmed.jpeg" width={40} height={40} alt="ahmed" className="rounded-circle" />
                  </figure>
                  <span className="title">ahmed</span>
                  <span className="message">I have a gift for you kimo..!!</span>
                </li>
                <li>
                  <figure className="image rounded">
                    <img src="img/landing/amal.jpeg" width={40} height={40} alt="amal" className="rounded-circle" />
                  </figure>
                  <span className="title">amal</span>
                  <span className="message">I will be happy whene I sell with your Store..!</span>
                </li>
                <li>
                  <figure className="image rounded">
                    <img src="img/landing/amira.jpeg" width={40} height={40} alt="amira" className="rounded-circle" />
                  </figure>
                  <span className="title">amira </span>
                  <span className="message">kenan I have probleme whene I sell product..!!</span>
                </li>
                <li>
                  <figure className="image rounded">
                    <img src="img/landing/omar.jpeg" width={40} height={40} alt="omar" className="rounded-circle" />
                  </figure>
                  <span className="title">Omar</span>
                  <span className="message">kimo do you have a coupons for your products</span>
                </li>
              </ul>
              <hr />
              <div className="text-end">
                <a href="#" className="view-more">View All</a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a href="#" className="dropdown-toggle notification-icon" data-bs-toggle="dropdown">
            <i className="bx bx-bell" />
            <span className="badge">3</span>
          </a>
          <div className="dropdown-menu notification-menu">
            <div className="notification-title">
              <span className="float-end badge badge-default">3</span>
              Alerts
            </div>
            <div className="content">
              <ul>
                <li>
                  <a href="#" className="clearfix">
                    <div className="image">
                      <i className="fas fa-thumbs-down bg-danger text-light" />
                    </div>
                    <span className="title">Server is Down!</span>
                    <span className="message">Just now</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <div className="image">
                      <i className="bx bx-lock bg-warning text-light" />
                    </div>
                    <span className="title">User Locked</span>
                    <span className="message">15 minutes ago</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <div className="image">
                      <i className="fas fa-signal bg-success text-light" />
                    </div>
                    <span className="title">Connection Restaured</span>
                    <span className="message">10/10/2023</span>
                  </a>
                </li>
              </ul>
              <hr />
              <div className="text-end">
                <a href="#" className="view-more">View All</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }
  
  export default Notification;