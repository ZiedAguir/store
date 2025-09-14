import { useEffect, useState } from "react";
import Footer from "../../componnent/Footer/footer";
import Header from "../../componnent/Header/headerprofil";
import ContactForm from "./contactForm";
import "./contactPage.css";
import Maps from "./maps";
import SocialMediaLinks from "./socialMediaLinks";

function ContactPage() {
  const [contactOptions, setContactOptions] = useState({});
  const [hasStep3Data, setHasStep3Data] = useState(false);

  useEffect(() => {
    // Récupérer les données de "step3Data" depuis localStorage pour la page de contact
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.ContactUs) {
      const options = step3Data.formSelections.ContactUs.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setContactOptions(options);
      setHasStep3Data(true);
    } else {
      // Default options for users who haven't completed step3
      setContactOptions({
        Header: false,
        ContactForm: true,
        LocationMap: true,
        SocialMediaLinks: true,
        footer: true
      });
      setHasStep3Data(false);
    }
  }, []);

  return (
    <div className="body">
      {contactOptions.Header && <Header />}
      
      {/* Header Contact Start */}
      <div className="header-ct bg-breadcrumb">
        <div className="text-center py-5">
          <h3 className="text-white display-3 mb-4 wow fadeInDown" data-wow-delay="0.1s">
            Contact Us
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </h3>
          <ol className="breadcrumb justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><a href="/">Astar_Store</a></li>
            <li className="breadcrumb-item"><a href="/faqpage">FAQ</a></li>
            <li className="breadcrumb-item"><a href="/aboutuspage">About Us</a></li>
            <li className="breadcrumb-item active text-primary">Contact</li>
          </ol>
        </div>
      </div>
      {/* Header Contact End */}

      {/* Show default content message for users without step3 data */}
      {!hasStep3Data && (
        <div className="container py-4">
          <div className="alert alert-info text-center">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Welcome!</strong> This is the default Contact page. 
            <a href="/step1" className="btn btn-primary btn-sm ms-2">
              <i className="fas fa-rocket me-1"></i>Create Your Custom Site
            </a>
          </div>
        </div>
      )}

      {/* Contact Section Start */}
      <div className="contct-page contact py-5">
        <div className="container py-5">
          <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="sub-style mb-4">
              <h4 className="sub-title text-white px-3 mb-0">Contact Us</h4>
            </div>
            <p className="mb-0 text-black-50">
              We are here to help! If you have any questions, suggestions, or need assistance, please do not hesitate to contact us. Our team is available to answer any requests you may have regarding our services or products.
            </p>
          </div>
          <div className="row g-4 align-items-center">
            
            {contactOptions.ContactForm && (
              <div className="col-lg-5 col-xl-5 contact-form wow fadeInLeft" data-wow-delay="0.1s">
                <h2 className="display-5 text-white mb-2">Get in Touch</h2>
                <p className="mb-4 text-white">
                  Use the form below to send us a message directly. Whether you have a question about an ongoing project, need technical support, or want to give us feedback, we are here for you. We will respond as soon as possible.
                </p>
                <ContactForm />
              </div>
            )}

            {contactOptions.LocationMap && (
              <div className="col-lg-5 col-xl-5 wow fadeInRight" data-wow-delay="0.3s">
                <Maps />
              </div>
            )}

            {contactOptions.SocialMediaLinks && (
              <div className="col-lg-5 col-xl-5 wow fadeInRight" data-wow-delay="0.3s">
                <SocialMediaLinks />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Contact Section End */}

      {contactOptions.footer && <Footer />}
    </div>
  );
}

export default ContactPage;
