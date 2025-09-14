import { useContext } from "react";
import { FormContext } from "../../../componnent/context/AuthContext";

function InfoProfil() {
      const { currentUser } = useContext(FormContext);
  // Check if currentUser exists
  if (!currentUser || !currentUser.data) {
    return <div>Loading...</div>;
  }

  const { name, role, phone,email,profileImg,addresseProfil,about } = currentUser.data;

    return (
        <section className="card">
        <div className="card-body">
          <div className="thumb-info mb-3">
          <img
            src={profileImg || "img/avatar.jpg"} 
            alt="avatar"
            className="rounded img-fluid"
             data-lock-picture={profileImg || "img/avatar.jpg"}
          />
             <div className="thumb-info-title">
              <span className="thumb-info-inner">{name || "Guest User"}</span>
              <span className="thumb-info-type">{role || "User"}</span>
            </div>
          </div>
          <div className="widget-toggle-expand mb-3">
            <div className="widget-content-expanded">
              <ul className="simple-todo-list mt-3">
                <li>
                  <span className=" font-weight-semibold text-dark">
                    Email:
                  </span>{" "}
                  {email || "Unknown"}
                </li>
                <li>
                  <span className=" font-weight-semibold text-dark">
                    Phone:
                  </span>{" "}
                  {phone || "Unknown"}
                </li>
                <li>
                  <span className=" font-weight-semibold text-dark">
                    Addresse:{" "}
                  </span>{" "}
                  {addresseProfil || "Unknown"}
                </li>
              </ul>
            </div>
          </div>
          <hr className="dotted short" />
          <h5 className="mb-2 mt-3">About</h5>
          <p className="text-2">
          {about || "web developer with a proven ability to adapt in both self-starting and collaborative environments while staying focused on achieving high- quality results under strictdeadlines"}
            
          </p>
          <div className="clearfix">
            <a className="text-uppercase text-muted float-end" href="#">
              (View All)
            </a>
          </div>
          <hr className="dotted short" />
          <div className="social-icons-list">
            <a
              rel="tooltip"
              data-bs-placement="bottom"
              target="_blank"
              href="http://www.facebook.com"
              data-original-title="Facebook"
            >
              <i className="fab fa-facebook-f" />
              <span>Facebook</span>
            </a>
            <a
              rel="tooltip"
              data-bs-placement="bottom"
              href="http://www.twitter.com"
              data-original-title="Twitter"
            >
              <i className="fab fa-twitter" />
              <span>Twitter</span>
            </a>
            <a
              rel="tooltip"
              data-bs-placement="bottom"
              href="http://www.linkedin.com"
              data-original-title="Linkedin"
            >
              <i className="fab fa-linkedin-in" />
              <span>Linkedin</span>
            </a>
          </div>
        </div>
      </section>

    );
  }
  
  export default InfoProfil;