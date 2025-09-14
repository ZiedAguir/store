import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicForm from "../DynamicForm/DynamicFormStep1";
import { FormContext } from "../../../componnent/context/AuthContext";
import "./step1.css";
import apiRequest from "../../../componnent/axios/axiosInstance";

function Step1() {
  const { formData, updateFormData, currentUser, isLoading, fetchUser } = useContext(FormContext);
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (!isLoading) navigate("/login");
        return;
      }

      // Ensure we have a user loaded
      let userObject = currentUser;
      if (!isLoading && !userObject) {
        userObject = await fetchUser();
      }

      const userId = userObject?.data?._id || userObject?._id;
      if (!isLoading && !userId) {
        navigate("/login");
        return;
      }

      const fetchData = async () => {
        try {
          const response = await apiRequest.get(`/step1/${userId}`);
          const data = response.data.data;
          if (data) {
            updateFormData("step1", data);
            localStorage.setItem("step1Data", JSON.stringify(data));
          } else {
            toast.info("Aucune donnée trouvée pour cet utilisateur.", {
              position: "top-right",
              autoClose: 5000,
            });
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
          toast.error(error.message || "Erreur lors de la récupération des données.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      };

      const savedStep1Data = localStorage.getItem("step1Data");
      if (savedStep1Data) {
        const parsedData = JSON.parse(savedStep1Data);
        const userData = parsedData.data || parsedData;
        if (userData.phone) {
          userData.phone = String(userData.phone);
        }
        updateFormData("step1", userData);
      } else if (!isLoading) {
        fetchData();
      }
    };

    init();
  }, [updateFormData, currentUser, navigate, isLoading, fetchUser]);

  useEffect(() => {
    //console.log("formData.step1:", formData.step1); 
  }, [formData.step1]);

  if (isLoading) {
    return <div>Chargement en cours...</div>; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData.step1, [name]: value };
    //console.log("Données mises à jour:", updatedData); 
    updateFormData("step1", updatedData);
    localStorage.setItem("step1Data", JSON.stringify(updatedData));
  };

  const handlePhoneChange = (phone, key) => {
    const updatedData = { ...formData.step1, [key]: String(phone) }; 
    //console.log("Données mises à jour:", updatedData); 
    updateFormData("step1", updatedData);
    localStorage.setItem("step1Data", JSON.stringify(updatedData));
  };

  const isFormValid = () => {
    const requiredFields = ["fullname", "email", "phone", "trafic", "discipline"];
    const hasRequiredFields = requiredFields.every((field) => formData.step1?.[field]);
    
    // Validate rating field
    const rating = parseFloat(formData.step1?.rating);
    const isRatingValid = !isNaN(rating) && rating >= 1 && rating <= 5;
    
    return hasRequiredFields && isRatingValid;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiRequest.put("/step1/update-step1", formData.step1);
      setStatusMessage(response.data.message || "Données mises à jour avec succès!");
      toast.success(response.data.message || "Données mises à jour avec succès!", {
        position: "top-right",
        autoClose: 5000,
      });
      localStorage.removeItem("step1Data");
      navigate("/step2");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de l'enregistrement des données.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="body custom-form-container">
      <ToastContainer />
      <div className="inner-wrapper">
        <section role="main" className="content-body card-margin">
          <div className="row cont-rt">
            <div className="col-lg-10">
              <form id="form" className="form-horizontal">
                <section className="card">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "#8dc9f5" }}
                  >
                    <h2 className="card-title">Business Information</h2>
                  </header>
                  <div className="card-body">
                    {statusMessage && (
                      <div className="alert alert-success">
                        {statusMessage}
                      </div>
                    )}
                    <DynamicForm
                      formData={formData.step1 || {}}
                      handleChange={handleChange}
                      handlePhoneChange={handlePhoneChange}
                    />
                  </div>
                  <footer className="card-footer">
                    <button
                      className="btn btn-primary btn-spacing"
                      onClick={handleNext}
                      disabled={isSubmitting}
                    >
                      Next
                    </button>
                  </footer>
                </section>
              </form>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Step1;


