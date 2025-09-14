import { useEffect, useState } from "react";
import Footer from "../../../componnent/Footer/footer";
import Header from "../../../componnent/Header/headerprofil";
import FormHomeCategory from "../FormCategory/formHomeCategory";
import ListHomeCategory from "../ListCategory/ListHomeCategory";

function HomeCategories() {
  const [homeCategoryOptions, setHomeCategoryOptions] = useState({});
  const [hasStep3Data, setHasStep3Data] = useState(false);

  useEffect(() => {
    // Retrieve "step3Data" from localStorage for homeCategories page
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Categories) {
      // Convert selected options into a homeCategoryOptions object
      const options = step3Data.formSelections.Categories.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setHomeCategoryOptions(options);
      setHasStep3Data(true);
    } else {
      // Default options for users who haven't completed step3
      setHomeCategoryOptions({
        Header: true,
        FormCategories: true,
        ListCategories: true,
        footer: true
      });
      setHasStep3Data(false);
    }
  }, []);

  return (
    <div>
      {/* Conditionally render Header */}
      {homeCategoryOptions.Header && <Header />}

      {/* Show default content message for users without step3 data */}
      {!hasStep3Data && (
        <div className="container py-4">
          <div className="alert alert-info text-center">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Welcome!</strong> This is the default Categories page. 
            <a href="/step1" className="btn btn-primary btn-sm ms-2">
              <i className="fas fa-rocket me-1"></i>Create Your Custom Site
            </a>
          </div>
        </div>
      )}

      {/* FormHomeCategory */}
      {homeCategoryOptions.FormCategories && (
        <section className="category-form-section">
          <FormHomeCategory />
        </section>
      )}

      {/* ListHomeCategory */}
      {homeCategoryOptions.ListCategories && (
        <section className="category-list-section">
          <ListHomeCategory />
        </section>
      )}

      {/* Conditionally render Footer */}
      {homeCategoryOptions.footer && <Footer />}
    </div>
  );
}

export default HomeCategories;
