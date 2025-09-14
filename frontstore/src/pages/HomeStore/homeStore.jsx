import Footer from "../../componnent/Footer/footer";
import HeaderStore from "../../componnent/Header/headerStore";
import CompanyInformation from "../pageStore/companyInformation";
import LatestNews from "../pageStore/information";
import Slider from "../pageStore/slider";
import Template from "../pageStore/template";
import VersionAstraStore from "../pageStore/versionAstraStore";

function HomeStore() {
  return (
    <div className="body">
      {/* Composant Header statique */}
      <HeaderStore/>
      
      {/* Welcome Banner for All Users */}
      

      {/* Contenu principal */}
      <div role="main" className="main">
        <CompanyInformation/>
        <LatestNews/>
        <Template/>
        <Slider/>
        <VersionAstraStore/>
        
        {/* Call-to-Action Section for All Users */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h2 className="h3 mb-4">Ready to Get Started?</h2>
                <p className="text-muted mb-4">
                  Whether you're a business owner, developer, or creative professional, 
                  Astra Store has the perfect solution for your website needs.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a href="/step1" className="btn btn-primary btn-lg">
                    <i className="fas fa-rocket me-2"></i>Create Your Site
                  </a>
                  <a href="/productpage" className="btn btn-outline-primary btn-lg">
                    <i className="fas fa-eye me-2"></i>Browse Templates
                  </a>
                  <a href="/register" className="btn btn-success btn-lg">
                    <i className="fas fa-user-plus me-2"></i>Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Composant Footer statique */}
      <Footer/>
    </div>
  );
}

export default HomeStore;

