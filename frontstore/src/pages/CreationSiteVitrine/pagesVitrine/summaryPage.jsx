import  { useEffect, useContext, useState } from "react";
import { FormContext } from "../../../componnent/context/AuthContext";
import apiRequest from "../../../componnent/axios/axiosInstance"; // Import API helper
import Header from "../../../componnent/Header/headerprofil";
import HeaderSummaryPage from "../../../componnent/Header/headerSummaryPage";
import SideBar from "../../../componnent/SideBare/sideBare";
import CustomizationPanel from "./CustomizationPanel/customizationPanel";
import FizzyButton from "../../../componnent/FizyButton/fizyButton";
import "./summaryPage.css";

function SummaryPage() {
  const { currentUser,formData, setFormData,customizationSettings,setCustomizationSettings} = useContext(FormContext);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const defaultSettings = {
    backgroundColor: "#ffffff",
    headerColor: "#ffffff",
    headerSumaryColor: "#ffffff",
    sidebarColor: "#ffffff",
    sidebarBackgroundColor: "#000000",
    layout: "standard",
    sidebarSize: "md",
    menuType: "simple",
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data exists in the context; if not, fetch from the API
        if (!formData?.step3) {
          const response = await apiRequest.get("/step3/");
          const { selectedPages, formSelections } = response.data;

          // Update the context
          setFormData((prevData) => ({
            ...prevData,
            step3: { selectedPages, formSelections },
          }));

          // Store in localStorage
          localStorage.setItem(
            "step3Data",
            JSON.stringify({ selectedPages, formSelections })
          );
        }
      } catch (error) {
        console.error("Error fetching step3 data:", error);
      }
    };

    fetchData();
  }, [formData, setFormData]);

  const handleSave = async (settings) => {
    try {
      const response = await apiRequest.put("/customization/update-customise", {
        settings,
      });
      if (response.status === 200) {
          setCustomizationSettings(settings);
          localStorage.setItem("customizationSettings", JSON.stringify(settings));
      } 
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des paramètres :", error);
    }
  };
  

  const handleReset = async () => {
    try {
      setCustomizationSettings(defaultSettings);
        const response = await apiRequest.put("/customization/update-customise", {
        settings: defaultSettings,
      });
      if (response.status === 200) {
        localStorage.setItem("customizationSettings", JSON.stringify(defaultSettings));
      } else {
        console.warn("Erreur inattendue lors de la mise à jour des paramètres.");
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des paramètres :", error);
    }
  };
  

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  useEffect(() => {
    const fetchCustomizationSettings = async () => {
      try {
        const userId = currentUser?.data?._id;
  
        if (!userId) {
          console.warn("userId est indéfini, impossible de récupérer la personnalisation.");
          return;
        }  
        // Charger les paramètres depuis l'API
        const response = await apiRequest.get(`/customization/get-customise/${userId}`);
  
        if (response.status === 200 && response.data?.data) {  
          localStorage.setItem("customizationSettings", JSON.stringify(response.data.data));
            setCustomizationSettings(response.data.data);
        } else {
          console.warn("Réponse inattendue de l'API :", response);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des paramètres depuis l'API :", error);
          const localSettings = localStorage.getItem("customizationSettings");
        if (localSettings) {
          setCustomizationSettings(JSON.parse(localSettings));
        } else {
          console.warn("Aucun paramètre trouvé dans localStorage.");
        }
      }
    };
  
    if (currentUser?.data?._id) {
      fetchCustomizationSettings();
    }
  }, [currentUser]);
  

  
  

  return (
    <section style={{ backgroundColor: customizationSettings.backgroundColor }} className={`summary-page ${customizationSettings.layout} ${animate ? "animate" : ""}`}>
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>

        <div className="header-summary-wrapper">
          <HeaderSummaryPage />
        </div>
      </div>

      {/* Floating Button */}
      <div onClick={() => setIsPanelVisible(!isPanelVisible)}>
        <FizzyButton />
      </div>

      {/* Customization Panel */}
      <div className={`customization-panel-wrapper ${isPanelVisible ? "show" : ""}`}>
        <CustomizationPanel
          onSave={handleSave}
          onReset={handleReset}
          onClose={() => setIsPanelVisible(false)}
        />
      </div>
    </section>
  );
}


export default SummaryPage;


