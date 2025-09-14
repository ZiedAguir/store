import { useEffect, useState } from "react";
import Footer from "../../componnent/Footer/footer";
import VersionAstraStore from "./versionAstraStore";
import Slider from "./slider";
import Template from "./template";
import LatestNews from "./information";
import CompanyInformation from "./companyInformation";
import HeaderStore from "../../componnent/Header/headerStore";



function PageStore() {
  const [storeOptions, setStoreOptions] = useState({});

  useEffect(() => {
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Home) {
      // Convertir les options sélectionnées en un objet storeOptions
      const options = step3Data.formSelections.Home.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setStoreOptions(options);
    }
  }, []);

  //console.log("storeOptions:", storeOptions); 

  return (
    <div className="body">
    
        {/* Afficher conditionnellement le Header */}
        {storeOptions.HeaderStore && <HeaderStore />}

        <div role="main" className="main">
          {/* Afficher conditionnellement les composants */}
          {storeOptions.CompanyInformation && <CompanyInformation />}
          {storeOptions.LatestNews && <LatestNews />}
          {storeOptions.Template && <Template />}
          {storeOptions.Slider && <Slider />}
          {storeOptions.VersionAstraStore && <VersionAstraStore />}
        </div>

        {/* Afficher conditionnellement le Footer */}
        {storeOptions.footer && <Footer/>}
      
    </div>
  );
}

export default PageStore;




