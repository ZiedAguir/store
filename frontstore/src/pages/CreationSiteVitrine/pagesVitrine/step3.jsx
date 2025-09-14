import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./step3.css";

import DynamicForm3 from "../DynamicForm/dynamicFormStep3";
import { FormContext } from "../../../componnent/context/AuthContext";
import fieldsConfigStep3 from "../FieldsConfig/fieldsConfigStep3";
import apiRequest from "../../../componnent/axios/axiosInstance";

function Step3() {
  const navigate = useNavigate();
  const { currentUser, updateFormData } = useContext(FormContext);
  const [selectedPages, setSelectedPages] = useState([]);
  const [formSelections, setFormSelections] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = currentUser?.data?._id;
        if (!userId) {
          toast.error("Utilisateur non connecté.", { position: "top-right", autoClose: 5000 });
          navigate("/login");
          return;
        }
  
        const response = await apiRequest.get(`/step3/get-step3/${userId}`);
        console.log("Réponse de l'API:", response.data); 
  
        const data = response.data.data;
        if (data) {
          console.log("Données récupérées depuis l'API:", data); 
          setSelectedPages(data.selectedPages || []);
          setFormSelections(data.formSelections || {});
          updateFormData("step3", data);
          localStorage.setItem("step3Data", JSON.stringify(data));
        } else {
          console.log("Aucune donnée trouvée dans l'API pour cet utilisateur.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        toast.error("Erreur lors de la récupération des données.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };
  
    const savedData = localStorage.getItem("step3Data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("Données chargées depuis le localStorage:", parsedData); 
      setSelectedPages(parsedData.selectedPages || []);
      setFormSelections(parsedData.formSelections || {});
      updateFormData("step3", parsedData);
    } else {
      console.log("Aucune donnée trouvée dans le localStorage. Récupération depuis l'API...");
      fetchData();
    }
  }, [currentUser, updateFormData, navigate]);


  const handleCheckboxChange = (pageName) => {
    setSelectedPages((prevSelectedPages) => {
      const isPageSelected = prevSelectedPages.includes(pageName);
      
      if (isPageSelected) {
        // Page is being unchecked - remove page and all its components
        const newSelectedPages = prevSelectedPages.filter((page) => page !== pageName);
        
        // Remove all components for this page from formSelections
        setFormSelections((prevSelections) => {
          const newSelections = { ...prevSelections };
          delete newSelections[pageName];
          return newSelections;
        });
        
        return newSelectedPages;
      } else {
        // Page is being checked - add page and automatically check all its components
        const newSelectedPages = [...prevSelectedPages, pageName];
        
        // Get the page configuration to find all its components
        const pageConfig = fieldsConfigStep3.find(config => config.pageName === pageName);
        if (pageConfig) {
          // Automatically check all components for this page
          const allComponentKeys = pageConfig.options.map(option => option.key);
          setFormSelections((prevSelections) => ({
            ...prevSelections,
            [pageName]: allComponentKeys
          }));
        }
        
        return newSelectedPages;
      }
    });
  };

  const handleOptionChange = (page, optionKey) => {
    setFormSelections((prevSelections) => {
      const currentPageSelections = prevSelections[page] || [];
      const isOptionSelected = currentPageSelections.includes(optionKey);
      
      let newPageSelections;
      if (isOptionSelected) {
        // Uncheck the component
        newPageSelections = currentPageSelections.filter((item) => item !== optionKey);
      } else {
        // Check the component
        newPageSelections = [...currentPageSelections, optionKey];
      }
      
      const newSelections = {
        ...prevSelections,
        [page]: newPageSelections
      };
      
      // If all components for this page are unchecked, automatically uncheck the page
      if (newPageSelections.length === 0) {
        setSelectedPages((prevSelectedPages) => 
          prevSelectedPages.filter((selectedPage) => selectedPage !== page)
        );
        // Remove the page from formSelections entirely
        delete newSelections[page];
      }
      
      return newSelections;
    });
  };

  const isFormValid = () => {
    return selectedPages.length > 0 && 
           Object.keys(formSelections).some((page) => formSelections[page].length > 0);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Veuillez sélectionner au moins une page et une option pour chaque page sélectionnée.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    const dataToSend = { selectedPages, formSelections };
    try {
      const response = await apiRequest.put("/step3/update-step3", dataToSend);
      setStatusMessage(response.data.message || "Données mises à jour avec succès!");
      toast.success(response.data.message || "Données mises à jour avec succès!", {
        position: "top-right",
        autoClose: 5000,
      });

      const updatedData = response.data.data;
      updateFormData("step3", { selectedPages, formSelections, ...updatedData });
      localStorage.setItem("step3Data", JSON.stringify({ selectedPages, formSelections, ...updatedData }));

      navigate("/step4");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour des données.",
        { position: "top-right", autoClose: 5000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    updateFormData("step3", { selectedPages, formSelections });
    localStorage.setItem("step3Data", JSON.stringify({ selectedPages, formSelections }));
    navigate("/step2");
  };

  return (
    <section className="body custom-form-container">
      <ToastContainer />
      <div className="inner-wrapper">
        <section role="main" className="content-body card-margin">
          <div className="row cont-rt">
            <div className="col-lg-10">
              <section className="card">
                <header className="card-header" style={{ backgroundColor: "#8dc9f5" }}>
                  <h2 className="card-title">Website Pages</h2>
                  <p className="card-subtitle">Select the pages and options you want to visit or configure.</p>
                  <div className="alert alert-info mt-3 mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Tip:</strong> When you check a page, all its components (Header, Footer, etc.) will be automatically selected. 
                    You can then uncheck individual components if needed. Unchecking all components will automatically uncheck the page.
                  </div>
                </header>
                <div className="card-body">
                  {statusMessage && (
                    <div className="alert alert-success">{statusMessage}</div>
                  )}
                  <DynamicForm3
                    fieldsConfig={fieldsConfigStep3}
                    selectedPages={selectedPages}
                    formSelections={formSelections}
                    onPageChange={handleCheckboxChange}
                    onOptionChange={handleOptionChange}
                  />
                </div>
                <footer className="card-footer">
                  <div className="row justify-content-center d-flex">
                    <div className="col-sm-2 d-flex justify-content-between">
                      <button className="btn btn-default btn-spacing" onClick={handleBack}>
                        Back
                      </button>
                      <button
                        className="btn btn-primary btn-spacing m-4"
                        onClick={handleNext}
                        disabled={isSubmitting}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </footer>
              </section>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Step3;





