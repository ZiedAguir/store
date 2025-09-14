
import { useContext, useEffect } from "react";
import "./customizationPanel.css";

import red from "/img/icons/header-red.png";
import mauve from "/img/icons/header-mauve.png";
import green from "/img/icons/header-green.png";
import rose from "/img/icons/header-rose.png";
import blue from "/img/icons/header-blue.png";
import jaune from "/img/icons/header-jaune.png";
import black from "/img/icons/black.png";


import sidebarRed from "/img/icons/sidebar-red.png";
import sidebarGreen from "/img/icons/sidebar-green.png"; 
import sidebarMauve from "/img/icons/sidebar-mauve.png";
import sidebarRose from "/img/icons/sidebar-rose.png";
import sidebarBlue from "/img/icons/sidebar-blue.png";
import sidebarJaune from "/img/icons/sidbar-yellow.png";
import sidebarBlack from "/img/icons/sidebar-black.png";

import backgroundLight from "/img/icons/background-light.png";
import backGroundBlack from "/img/icons/background-black.png";
import { FormContext } from "../../../../componnent/context/AuthContext";

import backgroundRed from "/img/icons/background-red.png";
import backgroundMauve from "/img/icons/background-mauve.png"; 
import backgroundGreen from "/img/icons/background-green.png";
import backgroundRose from "/img/icons/background-rose.png";
import backgroundBlue from "/img/icons/background-blue.png";
import backgroundJaune from "/img/icons/background-yellow.png";
import backgroundBlack from "/img/icons/background-black2.png";

function CustomizationPanel({ onSave, onReset, onClose }) {
  const { customizationSettings, setCustomizationSettings } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setCustomizationSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Dynamically map sidebar colors
  const sidebarImages = {
    red: sidebarRed,
    mauve: sidebarMauve,
    green: sidebarGreen,
    rose: sidebarRose,
    blue: sidebarBlue,
    jaune: sidebarJaune,
    black: sidebarBlack,
  };
  const sidebarBackgroundImages = {
    red: backgroundRed,
    mauve: backgroundMauve,
    green: backgroundGreen,
    rose: backgroundRose,
    blue: backgroundBlue,
    jaune: backgroundJaune,
    black: backgroundBlack,
  };
  const backGroundStyleImages = {
    light: backgroundLight,
    black: backGroundBlack,
  };

  const headerImages = {
    red,
    mauve,
    green,
    rose,
    blue,
    jaune,
    black
  };
  const backgroundColors = {
    light: "#ffffff",
    black: "#000000",
  };

  const headerColors = {
    red: "#FF5733",
    mauve: "#800080",
    green: "#008000",
    rose: "#ff007f",
    blue: "#0000ff",
    jaune: "#ffff00",
    black: "#000000",
  };
  const headerSumaryColors = {
    red: "#FF5733",
    mauve: "#800080",
    green: "#008000",
    rose: "#ff007f",
    blue: "#0000ff",
    jaune: "#ffff00",
    black: "#000000",
  };
  const sidebarColors = {
    red: "#ff0000",
    mauve: "#800080",
    green: "#008000",
    rose: "#ff007f",
    blue: "#0000ff",
    jaune: "#ffff00",
    black: "#000000",
  };
  const sidebarBackgroundColors = {
    red: "#ff0000",
    mauve: "#800080",
    green: "#008000",
    rose: "#ff007f",
    blue: "#0000ff",
    jaune: "#ffff00",
    black: "#000000",
  };
  {/* Header profil */}
  const handlebackgroundColorChange = (color) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      backgroundColor: backgroundColors[color], 
    }));
  };
 {/* Header profil */}
  const handleHeaderColorChange = (color) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      headerColor: headerColors[color], 
    }));
  };
  {/* summary header */}
  const handleHeaderSummaryColorChange = (color) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      headerSumaryColor: headerSumaryColors[color], 
    }));
  };
  
  {/* sidebae color */}
  const handleSidebarColorChange = (color) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      sidebarColor: sidebarColors[color],
    }));
  };
  {/* background sidebar */}
  const handleSidebarBackgroundColorChange = (color) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      sidebarBackgroundColor: sidebarBackgroundColors[color], 
    }));
  };

  useEffect(() => {
    // Dynamically update the sidebar color when settings change
    const currentSidebarColor = customizationSettings.sidebarColor;
    const sidebarImage = sidebarImages[currentSidebarColor];

    if (sidebarImage) {
      // Update sidebar appearance dynamically
    }
  }, [customizationSettings.sidebarColor]);

  return (
    <div className="customization-panel">
      <div className="panel-header">
        <h2>Customize Your Page</h2>
        <button className="btn btn-close" onClick={onClose}>✕</button>
      </div>

      <div className="customization-options-container">
       

        {/* Style de fond */}
        <div className="customization-option">
          <label>Background color:</label>
          <div className="header-color-options">
            {["light", "black"].map((color) => (
              <button
                key={color}
                className={`header-color-option ${customizationSettings.backgroundColor === backgroundColors[color] ? "selected" : ""}`}
                onClick={() => handlebackgroundColorChange(color)}
              >
                <img src={backGroundStyleImages[color]} alt={color} />
              </button>
            ))}
          </div>
        </div>
         

        {/* Style de mise en page */}
        <div className="customization-option">
          <label htmlFor="layout">Layout Style:</label>
          <select
            id="layout"
            value={customizationSettings.layout}
            onChange={(e) => handleInputChange("layout", e.target.value)}
          >
            <option value="standard">standard</option>
            <option value="compact">compact</option>
          </select>
        </div>

        {/* Couleur de l'entête */}
        <div className="customization-option1">
          <label>Header Color:</label>
          <div className="header-color-options">
            {["red", "mauve", "green", "rose", "blue", "jaune","black"].map((color) => (
              <button
              key={color}
              className={`header-color-option ${customizationSettings.headerColor === headerColors[color] ? "selected" : ""}`}
              onClick={() => handleHeaderColorChange(color)}
            >
              <img src={headerImages[color]} alt={color} />
            </button>
            
            ))}
          </div>
        </div>

         {/* Couleur de l'entête */}
         <div className="customization-option1">
          <label>Header SummaryPage:</label>
          <div className="header-color-options">
            {["red", "mauve", "green", "rose", "blue", "jaune","black"].map((color) => (
              <button
              key={color}
              className={`header-color-option ${customizationSettings.headerSumaryColor === headerSumaryColors[color] ? "selected" : ""}`}
              onClick={() => handleHeaderSummaryColorChange(color)}
            >
              <img src={headerImages[color]} alt={color} />
            </button>
            
            ))}
          </div>
        </div>

        {/* Couleur de la barre latérale */}
        <div className="customization-option1">
          <label>Sidebar Color:</label>
          <div className="sidebar-color-options">
            {["red", "mauve", "green", "rose", "blue", "jaune", "black"].map((color) => (
              <button
              key={color}
              className={`sidebar-color-option ${customizationSettings.sidebarColor === sidebarColors[color] ? "selected" : ""}`}
              onClick={() => handleSidebarColorChange(color)}
            >
                <img src={sidebarImages[color]} alt={color} />
              </button>
            ))}
          </div>
        </div>
         {/* Background Sidebar */}
           <div className="customization-option1">
          <label> Sidebar Background:</label>
          <div className="sidebar-color-options">
            {["red", "mauve", "green", "rose", "blue", "jaune", "black"].map((color) => (
              <button
              key={color}
              className={`sidebar-color-option ${customizationSettings.sidebarBackgroundColor === sidebarBackgroundColors[color] ? "selected" : ""}`}
              onClick={() => handleSidebarBackgroundColorChange(color)}
            >
              <img src={sidebarBackgroundImages[color]} alt={color} />
            </button>
            ))}
          </div>
        </div>
          

        {/* Taille de la barre latérale */}
        <div className="customization-option">
          <label htmlFor="sidebar-size">Sidebar Size:</label>
          <select
            id="sidebar-size"
            value={customizationSettings.sidebarSize}
            onChange={(e) => handleInputChange("sidebarSize", e.target.value)}
          >
            <option value="xs">XS</option>
            <option value="sm">SM</option>
            <option value="md">MD</option>
          </select>
        </div>

        {/* Type de menu */}
        <div className="customization-option">
          <label htmlFor="menu-type">Menu Type:</label>
          <select
            id="menu-type"
            value={customizationSettings.menuType}
            onChange={(e) => handleInputChange("menuType", e.target.value)}
          >
            <option value="simple">Simple Icon</option>
            <option value="color-icon">large Icon</option>
          </select>
        </div>
      </div>

      {/* Boutons de sauvegarde */}
      <div className="customization-buttons">
        <button className="btn btn-success" onClick={() => onSave(customizationSettings)}>Save</button>
        <button className="btn btn-danger" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default CustomizationPanel;




