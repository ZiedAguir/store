import { useEffect, useState } from "react";
import Footer from "../../componnent/Footer/footer";
import Header from "../../componnent/Header/headerprofil";

import "./aboutPage.css";
import CompanyHistory from "./companyHistory";
import CompanyInfo from "./companyInfo";
import MissionVission from "./missionVission";
import TeamInfo from "./teamInfo";

function AboutUsPage() {
  const [aboutOptions, setAboutOptions] = useState({});
  const [hasStep3Data, setHasStep3Data] = useState(false);

  useEffect(() => {
    // Récupérer les données de "step3Data" depuis localStorage pour la page "About Us"
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.AboutUs) {
      // Convertir les options sélectionnées en un objet aboutOptions
      const options = step3Data.formSelections.AboutUs.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setAboutOptions(options);
      setHasStep3Data(true);
    } else {
      // Default options for users who haven't completed step3
      setAboutOptions({
        Header: false,
        CompanyHistory: true,
        CompanyInfo: true,
        TeamInfo: true,
        MissionVission: true,
        footer: true
      });
      setHasStep3Data(false);
    }
  }, []);

  return (
    <div>
      {/* Affichage conditionnel des composants selon les options sélectionnées */}
      {aboutOptions.Header && <Header />}
      
      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h3 className="text-white display-3 mb-4 wow fadeInDown" data-wow-delay="0.1s">
            About Us
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </h3>
          <ol className="breadcrumb justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><a href="/contactuspage">Contact</a></li>
            <li className="breadcrumb-item"><a href="/faqpage">FAQ</a></li>
            <li className="breadcrumb-item"><a href="/">Astra-Store</a></li>
            <li className="breadcrumb-item active text-primary">About Us</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Show default content message for users without step3 data */}
      {!hasStep3Data && (
        <div className="container py-4">
          <div className="alert alert-info text-center">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Welcome!</strong> This is the default About Us page. 
            <a href="/step1" className="btn btn-primary btn-sm ms-2">
              <i className="fas fa-rocket me-1"></i>Create Your Custom Site
            </a>
          </div>
        </div>
      )}

      {/* Affichage conditionnel des composants principaux */}
      {aboutOptions.CompanyHistory && <CompanyHistory />}
      {aboutOptions.CompanyInfo && <CompanyInfo />}
      {aboutOptions.TeamInfo && <TeamInfo />}
      {aboutOptions.MissionVission && <MissionVission />}

      {aboutOptions.footer && <Footer />}
    </div>
  );
}

export default AboutUsPage;
