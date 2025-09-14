import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../componnent/axios/axiosInstance";
import "./verifyMfa.css";
import { FormContext } from "../../componnent/context/AuthContext";

function VerifyMfa() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser, fetchUser } = useContext(FormContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = currentUser?.email || formData.get("email");
    const mfaCode = [...Array(6)]
      .map((_, index) => formData.get(`mfa-${index}`))
      .join("");

    console.log("VerifyMfa - Starting MFA verification for email:", email);

    try {
      const response = await apiRequest.post("/auth/verify-mfa", { email, mfaCode });
      console.log("VerifyMfa - MFA verification response:", response.data);

      if (response.status === 200) {
        const { accessToken, user } = response.data;
        console.log("VerifyMfa - Setting token and user:", { accessToken: !!accessToken, user });
        
        localStorage.setItem("token", accessToken);
        setCurrentUser(user);
        
        console.log("VerifyMfa - About to fetch user data");
        await fetchUser();
        
        console.log("VerifyMfa - Navigating to home page");
        navigate("/");
      }
    } catch (err) {
      console.error("VerifyMfa - Error during MFA verification:", err);
      setError(err.response?.data?.message || "Verification failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) fetchUser();
  }, [currentUser, fetchUser]);

  return (
    <section className="body-sign">
      <div className="center-sign">
        <a href="/" className="logo float-start">
          <img src="img/astra2.png" width={150} alt="astra" />
        </a>
        <div className="panel card-sign">
          <div className="card-title-sign mt-3 text-end">
            <h2 className="title text-uppercase font-weight-bold ">
              <i className="bx bx-key me-1 text-6 position-relative top-5" />
              Verify MFA
            </h2>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              {!currentUser?.email && (
                <div className="form-group">
                  <label htmlFor="email" className="email-label">
                    Email:
                  </label>
                  <input
                    className="email-input form-control"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              )}
              <div className="mfa-inputs">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    id={`mfa-${index}`}
                    name={`mfa-${index}`}
                    type="text"
                    maxLength="1"
                    className="mfa-input form-control text-center"
                    onInput={(e) => {
                      if (e.target.value && index < 5) {
                        document.getElementById(`mfa-${index + 1}`).focus();
                      }
                    }}
                    required
                  />
                ))}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg  mt-3"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
        <p className="text-center text-muted mt-3 mb-3">
          © Copyright 2025. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}

export default VerifyMfa;





