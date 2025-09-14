import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicForm2 from "../DynamicForm/dynamicFormStep2";
import { FormContext } from "../../../componnent/context/AuthContext";
import apiRequest from "../../../componnent/axios/axiosInstance";

function Step2() {
  const { formData, updateFormData, currentUser, isLoading } =
    useContext(FormContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Récupérer les données depuis l'API ou le localStorage
  useEffect(() => {
    if (!isLoading && !currentUser?.data?._id) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userId = currentUser.data._id;
        const response = await apiRequest.get(`/step2/get-step2/${userId}`);
        const data = response.data.data;

        if (data) {
          updateFormData("step2", data);
          localStorage.setItem("step2Data", JSON.stringify(data));
        } else {
          toast.info("Aucune donnée trouvée pour cet utilisateur.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error(
          error.message || "Erreur lors de la récupération des données.",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      }
    };

    const savedStep2Data = localStorage.getItem("step2Data");
    if (savedStep2Data) {
      const parsedData = JSON.parse(savedStep2Data);
      updateFormData("step2", parsedData);
      //console.log("Données chargées depuis le localStorage :", parsedData);
    } else if (!isLoading) {
      fetchData();
    }
  }, [updateFormData, currentUser, navigate, isLoading]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    let fieldValue;

    if (type === "file") {
      fieldValue = files[0];
    } else {
      fieldValue = value;
    }

    const updatedData = { ...formData.step2, [name]: fieldValue };
    updateFormData("step2", updatedData);
    localStorage.setItem("step2Data", JSON.stringify(updatedData));
  };

  // Valider le formulaire
  const isFormValid = () => {
    const requiredFields = ["logo", "column", "domain"];
    return requiredFields.every((field) => formData.step2?.[field]);
  };

  // Mettre à jour les données via l'API
  const handleUpdateStep2 = async () => {
    setLoading(true);

    try {
      const { logo, slogan, description, column, domain } = formData.step2;

      const formDataToSend = new FormData();

      if (logo) {
        if (logo instanceof File) {
          formDataToSend.append("logo", logo);
        } else if (typeof logo === "string") {
          formDataToSend.append("logo", logo);
        }
      }

      // Ajouter les autres champs
      formDataToSend.append("slogan", slogan || "");
      formDataToSend.append("description", description || "");
      formDataToSend.append("column", column);
      formDataToSend.append("domain", domain);

      console.log("Données envoyées à l'API :", formDataToSend);

      const token = localStorage.getItem("token");
      const response = await apiRequest.put(
        "/step2/update-step2",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedData = response.data.data;
        console.log("Réponse de l'API :", updatedData);

        // Stocker les données mises à jour dans le localStorage
        const updatedStep2Data = {
          ...formData.step2,
          logo: updatedData.logo,
          slogan: updatedData.slogan,
          description: updatedData.description,
          column: updatedData.column,
          domain: updatedData.domain,
        };

        localStorage.setItem("step2Data", JSON.stringify(updatedStep2Data));
        updateFormData("step2", updatedStep2Data);

        toast.success("Données mises à jour avec succès !", {
          position: "top-right",
          autoClose: 5000,
        });
        navigate("/step3");
      } else {
        toast.error(
          response.data.message || "Échec de la mise à jour des données.",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur réseau, veuillez réessayer.",
        { position: "top-right", autoClose: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      handleUpdateStep2();
    } else {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/step1");
  };

  return (
    <section className="body custom-form-container">
      <ToastContainer />
      <div className="inner-wrapper">
        <section role="main" className="content-body card-margin">
          <div className="row cont-rt">
            <div className="col-lg-10">
              <form id="form-step2" className="form-horizontal">
                <section className="card">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "#8dc9f5" }}
                  >
                    <h2 className="card-title">Company Information</h2>
                    <p className="card-subtitle">
                      Please provide your logo, slogan, description and other
                      details.{" "}
                    </p>
                  </header>
                  <div className="card-body">
                    <DynamicForm2
                      formData={formData.step2 || {}}
                      handleChange={handleChange}
                    />
                  </div>
                  <footer className="card-footer">
                    <div className="row justify-content-center d-flex">
                      <div className="col-sm-2 d-flex justify-content-between">
                        <button
                          className="btn btn-default btn-spacing"
                          onClick={handleBack}
                        >
                          back
                        </button>
                        <button
                          className="btn btn-primary btn-spacing m-4"
                          onClick={handleNext}
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Next"}
                        </button>
                      </div>
                    </div>
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

export default Step2;
