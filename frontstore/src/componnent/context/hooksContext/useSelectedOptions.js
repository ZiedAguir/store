import { useState } from "react";

export const useSelectedOptions = (pagesConfig) => {
  const initialOptions = Object.keys(pagesConfig).reduce((acc, page) => {
    acc[page] = pagesConfig[page].reduce((pageAcc, option) => {
      pageAcc[option.replace(/\s+/g, "")] = false;
      return pageAcc;
    }, {});
    return acc;
  }, {});

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedSelectedOptions = localStorage.getItem("selectedOptions");
    return savedSelectedOptions ? JSON.parse(savedSelectedOptions) : initialOptions;
  });

  const updatePageOptions = (page, optionKey, value) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = {
        ...prevOptions,
        [page]: { ...prevOptions[page], [optionKey]: value },
      };
      localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
      return updatedOptions;
    });
  };

  return { selectedOptions, updatePageOptions };
};
