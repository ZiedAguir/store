import { useState, useEffect, useCallback } from "react";

export const useFormData = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { step1: {}, step2: {}, step3: {}, step4: {} };
  });

  const updateFormData = useCallback((step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));
  }, []);

 useEffect(() => {
  const previousData = localStorage.getItem("formData");
  const parsedData = previousData ? JSON.parse(previousData) : null;

  if (JSON.stringify(parsedData) !== JSON.stringify(formData)) {
    localStorage.setItem("formData", JSON.stringify(formData));
  }
}, [formData]);

  return { formData, updateFormData };
};
