import { useContext } from "react";
import { FormContext } from "../../../componnent/context/AuthContext";

function UpdateProjects() {
    const { currentUser } = useContext(FormContext);
    // Check if currentUser exists
    if (!currentUser || !currentUser.data) {
      return <div>Loading...</div>;
    }
    const {Projects,descriptionOfproject} = currentUser.data;
    return (
        <div>
                <h4 className="mb-3 mt-4 pt-2 font-weight-semibold text-dark">
                Projects
              </h4>
              <ul className="simple-bullet-list mb-3">
              <li className="red">
                  <span className="title">{Projects || "unknow"}</span>
                  <span className="description truncate">
                    {descriptionOfproject || "unknow"}
                  </span>
                </li>
                <li className="red">
                  <span className="title">LuxeShowcase</span>
                  <span className="description truncate">
                    perfect perfermance{" "}
                  </span>
                </li>
                <li className="green">
                  <span className="title">VisualizeIt</span>
                  <span className="description truncate">
                    Professional appearance
                  </span>
                </li>
                <li className="blue">
                  <span className="title">VistaVitrine</span>
                  <span className="description truncate">
                    The design is intuitive.
                  </span>
                </li>
                <li className="orange">
                  <span className="title">GallerySpot</span>
                  <span className="description truncate">
                    The website is great.
                  </span>
                </li>
              </ul>
        </div>
        
       
    );
  }
  
  export default UpdateProjects;