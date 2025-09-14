import { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/AuthContext";

function Pages() {
  const {  customizationSettings } = useContext(FormContext);
  const selectedColor = customizationSettings.sidebarColor || "#000"; 
  const menuType = customizationSettings.menuType || "simple"; 
  const iconSize = menuType === "simple" ? "1rem" : "1.8rem";

  const [isPageOpen2, setPageOpen2] = useState(false);
  const togglePageVitrine2 = () => {
    setPageOpen2(!isPageOpen2);
  };
const [selectedPages, setSelectedPages] = useState([]);
const [formSelections, setFormSelections] = useState({});
const { formData } = useContext(FormContext); 
useEffect(() => {
  if (formData.step3) {
    setSelectedPages(formData.step3.selectedPages || []);
    setFormSelections(formData.step3.formSelections || {});
  } else {
    const savedData = localStorage.getItem("step3Data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSelectedPages(parsedData.selectedPages || []);
      setFormSelections(parsedData.formSelections || {});
    }
  }
}, [formData]);
    return (
       <li className={`nav-parent ${isPageOpen2 ? 'nav-expanded nav-active' : ''}`}>
             <a className="nav-link" href="#" onClick={togglePageVitrine2 }>
               <i className="bx bx-file" aria-hidden="true" style={{ color: selectedColor, fontSize: iconSize }} />
               <span>Pages</span>
             </a>
             
           {isPageOpen2 && (
                             <ul className="nav nav-children">
                               {selectedPages.length > 0 ? (
                                 selectedPages.map((page, index) => (
                                   <li key={index}>
                                     <a className="nav-link" href={`/${page.toLowerCase()}Page`}>
                                       {page}
                                     </a>
                                     {formSelections[page]?.length > 0 && (
                                       <ul>
                                         {formSelections[page].map((option, idx) => (
                                           <li key={idx} style={{ paddingLeft: "15px" }}>
                                             <i className="bx bx-chevron-right" /> {option}
                                           </li>
                                         ))}
                                       </ul>
                                     )}
                                   </li>
                                 ))
                               ) : (
                                 <li>No pages selected</li>
                               )}
                             </ul>
                           )}
        </li>
    );
  }
  
  export default Pages;