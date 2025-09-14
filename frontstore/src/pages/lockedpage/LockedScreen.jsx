import { useContext, useState } from "react";
import "./lockScreen.css";
import { FormContext } from "../../componnent/context/AuthContext";
import { useNavigate } from "react-router-dom";


function LockedScreen() {
  const { currentUser } = useContext(FormContext);
  const [isLocked, setIsLocked] = useState(true); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  if (!currentUser || !currentUser.data) {
    return <div>Loading...</div>;
  }

  const { name,role, email, profileImg } = currentUser.data;

  // Fonction pour basculer entre verrouillé/déverrouillé
  const handleUnlock = (e) => {

    e.preventDefault();
    if (password === "081993") {
      setIsLocked(false); 
      navigate("/summarypage");
    } else {
      navigate("/Page_500")
    }
  };

  const handleLock = () => {
    setIsLocked(true); 
  };

  return (
    <section className="body-sign body-locked custom-center-section">
      <div className="center-sign">
        <div className="panel card-sign">
          <div className="card-body">
            {isLocked ? (
              // Écran verrouillé
              <form onSubmit={handleUnlock}>
                <div className="current-user text-center">
                  <img
                    src={profileImg || "img/avatar.jpg"}
                    alt="avatar"
                    className="rounded-circle"
                    data-lock-picture={profileImg || "img/avatar.jpg"}
                  />
                  <h2 className="user-name text-dark m-0">{name}</h2>
                  <p className="user-email m-0">{email}</p>
                </div>

                <div className="form-group mb-3">
                  <div className="input-group">
                    <input
                      id="pwd"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="input-group-text">
                      <i className="bx bx-lock" />
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <p className="mt-1 mb-3">
                      <a href="#">Not {role}?</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary pull-right">
                      Unlock
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // Écran déverrouillé
              <div className="text-center">
                <h2>Bienvenue, {name}!</h2>
                <p>Votre session est active.</p>
                <button onClick={handleLock} className="btn btn-danger">
                  Lock Screen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LockedScreen;

