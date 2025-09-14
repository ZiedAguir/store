import { useState , useContext, useEffect } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import apiRequest from "../../componnent/axios/axiosInstance";
import { FormContext } from "../../componnent/context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [country, setCountry] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser } = useContext(FormContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Identity Services and render the button
    const clientId = (import.meta?.env?.VITE_GOOGLE_CLIENT_ID)
      || (typeof document !== 'undefined' ? document.querySelector('meta[name="google-client-id"]')?.getAttribute('content') : null)
      || (typeof window !== 'undefined' ? window.GOOGLE_CLIENT_ID : null);

    try {
      if (window.google && google.accounts && google.accounts.id && clientId) {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              const idToken = response.credential;
              await apiRequest.post('/auth/google', { idToken });
              await fetchUser();
              navigate('/');
            } catch (e) {
              console.error('Google login failed', e);
              alert(e?.response?.data?.message || e.message || 'Google login failed');
            }
          },
          ux_mode: 'popup',
          auto_select: false,
        });
        const target = document.getElementById('googleSignInButton');
        if (target) {
          google.accounts.id.renderButton(target, {
            theme: 'filled_blue',
            size: 'large',
            text: 'continue_with',
            shape: 'pill',
            logo_alignment: 'left',
          });
        }
      }
    } catch (err) {
      console.warn('Google Identity Services initialization failed:', err);
    }
  }, [fetchUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Get form data directly from state variables
      // Role is always "user" for new registrations
      const response = await apiRequest.post(
        "/auth/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
          country,
          role: "user" // Always set role to "user"
        }
      );
     
      console.log("User signed up successfully:", response.data);
      await fetchUser();
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="body-sign">
      <div className="center-sign mb-3">
        <a href="/homepage" className="logo float-start">
          <img src="img/astra2.png" width={150} alt="astra" />
        </a>
        <div className="panel card-sign">
          <div className="card-title-sign mt-3 text-end">
            <h2 className="title text-uppercase font-weight-bold m-0">
              <i className="bx bx-user-circle me-1 text-6 position-relative top-5" />{" "}
              Register
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>E-mail Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label>Country/Region</label>
                <select
                  name="country"
                  className="form-control form-control-lg"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select your country</option>
                  <option value="USA/Canada">USA/Canada</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Austria">Austria</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Poland">Poland</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Romania">Romania</option>
                  <option value="Greece">Greece</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Finland">Finland</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Estonia">Estonia</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="India">India</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="UAE">UAE</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Oman">Oman</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Iran">Iran</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Israel">Israel</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Syria">Syria</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Egypt">Egypt</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Libya">Libya</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Niger">Niger</option>
                  <option value="Togo">Togo</option>
                  <option value="Benin">Benin</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Chad">Chad</option>
                  <option value="Central African Republic">Central African Republic</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="São Tomé and Príncipe">São Tomé and Príncipe</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Republic of the Congo">Republic of the Congo</option>
                  <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                  <option value="Angola">Angola</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Somalia">Somalia</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Réunion">Réunion</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Peru">Peru</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Suriname">Suriname</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Password Confirmation</label>
                    <input
                      name="passwordConfirm"
                      type="password"
                      className="form-control form-control-lg"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="checkbox-custom checkbox-default">
                    <input id="AgreeTerms" name="agreeterms" type="checkbox" />
                    <label htmlFor="AgreeTerms">
                      I agree with <a href="#">terms of use</a>
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 text-end">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    style={{ marginLeft: "20px" }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="alert alert-danger mt-3">
                  <strong>Error:</strong> {errorMessage}
                </div>
              )}
              <span className="mt-3 mb-3 line-thru text-center text-uppercase">
                <span>or</span>
              </span>
              <div className="mb-1 text-center">
                <div id="googleSignInButton" style={{ display: 'inline-block' }} />
              </div>
              <p className="text-center">
                Already have an account? <a href="/login">Login!</a>
              </p>
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

export default Register;
