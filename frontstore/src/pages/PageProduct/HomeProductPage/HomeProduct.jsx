import { useEffect, useState } from "react";
import Footer from "../../../componnent/Footer/footer";
import Header from "../../../componnent/Header/headerprofil";
import CartShoping from "./ComponentPage/cartShoping";
import ListProduct from "./ComponentPage/listProduct";
import ShowReview from "./ComponentPage/showReview";

function HomeProduct() {
  const [productOptions, setProductOptions] = useState({});
  const [hasStep3Data, setHasStep3Data] = useState(false);

  useEffect(() => {
    // Récupérer les données de "step3Data" depuis localStorage
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Product) {
      // Convertir les options sélectionnées en un objet productOptions
      const options = step3Data.formSelections.Product.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setProductOptions(options);
      setHasStep3Data(true);
    } else {
      // Default options for users who haven't completed step3
      setProductOptions({
        Header: true,
        ListProduct: true,
        CartShoping: true,
        showReviews: true,
        footer: true
      });
      setHasStep3Data(false);
    }
  }, []);

  return (
    <div>
      <div className="body">
        {productOptions.Header && <Header />}
        <div role="main" className="main">
          <section className="section section-concept section-no-border section-dark section-angled section-angled-reverse border-top-0 pt-5 m-0">
            <div
              className="section-angled-layer-bottom bg-light"
              style={{ padding: "10px" }}
            />
            <div className="container pt-3 mt-2"></div>
          </section>

          {/* Show default content message for users without step3 data */}
          {!hasStep3Data && (
            <div className="container py-4">
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Welcome!</strong> This is the default Products page. 
                <a href="/step1" className="btn btn-primary btn-sm ms-2">
                  <i className="fas fa-rocket me-1"></i>Create Your Custom Site
                </a>
              </div>
            </div>
          )}

          {productOptions.ListProduct && <ListProduct />}
          {productOptions.CartShoping && <CartShoping />}
          {productOptions.showReviews && <ShowReview />}
        </div>
        {productOptions.footer && <Footer />}
      </div>
    </div>
  );
}

export default HomeProduct;

