import { createContext, useState, useEffect } from "react";
import { useCurrentUser } from "./hooksContext/useCurrentUser";
import { useFormData } from "./hooksContext/useFormData";
import { useSelectedOptions } from "./hooksContext/useSelectedOptions";
import pagesConfig from "../../config/pagesConfig";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { currentUser, setCurrentUser, isLoading, fetchUser, logout, refreshToken } = useCurrentUser();
  const { formData, updateFormData } = useFormData();
  const { selectedOptions, updatePageOptions } = useSelectedOptions(pagesConfig);
  const [customizationSettings, setCustomizationSettings] = useState({
    color: "#f5312b", 
    backgroundColor: "light",
    layout: "standard",
    headerColor: "light",
    sidebarColor: "light",
    sidebarSize: "md",
    menuType: "simple",
  });

  // Debug logging to help identify the issue
  useEffect(() => {
    console.log("FormProvider - currentUser:", currentUser);
    console.log("FormProvider - isLoading:", isLoading);
  }, [currentUser, isLoading]);

  // Security: Clear any persisted form data if detected user switched
  try {
    const persistedUserId = localStorage.getItem('lastUserId');
    const activeUserId = currentUser?.data?._id || currentUser?._id;
    if (activeUserId && persistedUserId && persistedUserId !== String(activeUserId)) {
      localStorage.removeItem('formData');
      localStorage.removeItem('step1Data');
      localStorage.removeItem('step2Data');
      localStorage.removeItem('step3Data');
      localStorage.removeItem('step4Data');
    }
    if (activeUserId) {
      localStorage.setItem('lastUserId', String(activeUserId));
    }
  } catch (error) {
    console.error("Error in FormProvider security check:", error);
  }

  return (
    <FormContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        fetchUser,
        logout,
        refreshToken,
        formData,
        updateFormData,
        selectedOptions,
        updatePageOptions,
        pagesConfig,
        customizationSettings, 
        setCustomizationSettings,
        isLoading, // Expose loading state to components that need it
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

 


