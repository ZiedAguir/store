import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../componnent/axios/axiosInstance";
import "./verifyResetCode.css"
function VerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const resetCode = [...Array(6)]
      .map((_, index) => formData.get(`resetCode-${index}`))
      .join("");

    setIsLoading(true);

    try {
      const response = await apiRequest.post("/auth/verifyResetCode", {
        resetCode,
      });

      setStatusMessage(response.data.message ||"Reset code verified successfully!");
      setErrorMessage(null);

      navigate("/resetPassword");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to verify reset code."
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
              <i className="bx bx-key me-1 text-6 position-relative top-5" />
              Verify Reset Code
            </h2>
          </div>
          <div className="card-body">
            <div className="alert alert-info">
              <p className="m-0">
                Enter the reset code sent to your email to verify your request.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="resetCode-inputs">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    id={`resetCode-${index}`}
                    name={`resetCode-${index}`}
                    type="text"
                    maxLength="1"
                    className="resetCode-input form-control text-center"
                    onInput={(e) => {
                      if (e.target.value && index < 5) {
                        document.getElementById(`resetCode-${index + 1}`).focus();
                      }
                    }}
                    required
                  />
                ))}
              </div>
              <button
                className="btn btn-primary btn-lg  mt-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
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

export default VerifyResetCode;

