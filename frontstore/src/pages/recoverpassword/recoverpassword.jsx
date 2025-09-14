import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../componnent/axios/axiosInstance";

function RecoverPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");

    try {
      const response = await apiRequest.post("/auth/forgotPassword", { email });

      setStatusMessage(response.data.message || "Reset instructions sent!");
      setErrorMessage(null);

      navigate("/verifyResetCode");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to send reset instructions."
      );
      setStatusMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="body-sign">
      <div className="center-sign">
        <a href="/" className="logo float-start">
          <img src="img/astra2.png" width={150} alt="astra" />
        </a>
        <div className="panel card-sign">
          <div className="card-title-sign mt-3 text-end">
            <h2 className="title text-uppercase font-weight-bold m-0">
              <i className="bx bx-user-circle me-1 text-6 position-relative top-5" />
              Recover Password
            </h2>
          </div>
          <div className="card-body">
            <div className="alert alert-info">
              <p className="m-0">
                Enter your e-mail below and we will send you reset instructions!
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-0">
                <div className="input-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    className="form-control form-control-lg"
                    required
                  />
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Reset!"}
                  </button>
                </div>
              </div>
              <p className="text-center mt-3">
                Remembered? <a href="/login">Login!</a>
              </p>
            </form>
            {statusMessage && (
              <div className="alert alert-success mt-3">{statusMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
          </div>
        </div>
        <p className="text-center text-muted mt-3 mb-3">
          © Copyright 2025. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}

export default RecoverPassword;
