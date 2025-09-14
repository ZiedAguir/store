import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../componnent/axios/axiosInstance";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const newPassword = formData.get("newPassword");
    setIsLoading(true);
    try {
      const response = await apiRequest.post("/auth/resetPassword", { email,newPassword});
      setStatusMessage(response.data.message || "Password reset successfully!");
      setErrorMessage(null);
      navigate("/");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to reset password."
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
              <i className="bx bx-lock me-1 text-6 position-relative top-5" />
              Reset Password
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                     className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  newPassword
                </label>
                <input
                  id="newPassword"
                   placeholder="Enter your newpassword"
                  name="newPassword"
                  type="password"
                  className="form-control"
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-lg mt-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
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

export default ResetPassword;
