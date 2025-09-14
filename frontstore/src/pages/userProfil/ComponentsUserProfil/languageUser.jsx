import { useContext } from "react";
import { FormContext } from "../../../componnent/context/AuthContext";

function LanguageUser() {
        const { currentUser } = useContext(FormContext);
  // Check if currentUser exists
  if (!currentUser || !currentUser.data) {
    return <div>Loading...</div>;
  }
  const {Language } = currentUser.data;

    return (
        <section className="card">
        <header className="card-header">
          <div className="card-actions">
            <a
              href="#"
              className="card-action card-action-toggle"
              data-card-toggle
            />
            <a
              href="#"
              className="card-action card-action-dismiss"
              data-card-dismiss
            />
          </div>
          <h2 className="card-title">Language</h2>
        </header>
        <div className="card-body">
          <ul className="simple-post-list">
            <li>{Language || "unknow"}</li>
            <li>English</li>
            <li>Frensh</li>
            <li>Espanyol</li>
            <li>Arabic</li>
          </ul>
        </div>
      </section>

    );
  }
  
  export default LanguageUser;