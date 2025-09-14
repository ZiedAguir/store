import { useState } from "react";
import "./shopDetails.css";
import ReviewComponent from "../../../../componnent/Review/review";
import ProductDetailsSection from "./shopDetailsSection";

function ShopDetails({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState("tab-pane-1");

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.querySelector(`#${tabId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ width: "85%" }}>
      <div
        className="container-fluid mb-5"
        style={{ borderRadius: "1rem", backgroundColor: "#2bf5a0" }}
      >
        <div
          className="container d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 150 }}
        >
          <h1 className="font-weight-semi-bold text-white mb-3">Shop Details</h1>
          <div className="d-inline-flex">
            <p className="m-0 text-white"><a href="/">Home</a></p>
            <p className="m-0 px-2 text-white">-</p>
            <p className="m-0 text-white">Shop-Details</p>
            <div className="spinner-grow text-light" style={{ marginLeft: "10px" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {product.images.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img src={image} className="d-block w-100" alt={`prod-${index}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/*  ProductDetailsSection */}
          <ProductDetailsSection
            product={product}
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
              <a
                className={`nav-item nav-link ${activeTab === "tab-pane-1" ? "active" : ""}`}
                onClick={() => handleTabClick("tab-pane-1")}
              >
                Description
              </a>
              <a
                className={`nav-item nav-link ${activeTab === "tab-pane-2" ? "active" : ""}`}
                onClick={() => handleTabClick("tab-pane-2")}
              >
                Information
              </a>
              <a
                className={`nav-item nav-link ${activeTab === "tab-pane-3" ? "active" : ""}`}
                onClick={() => handleTabClick("tab-pane-3")}
              >
                Reviews
              </a>
            </div>

            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "tab-pane-1" ? "show active" : ""}`}
                id="tab-pane-1"
              >
                <h4 className="mb-3">Product Description</h4>
                <p>{product.description}</p>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "tab-pane-2" ? "show active" : ""}`}
                id="tab-pane-2"
              >
                <h4 className="mb-3">Additional Information</h4>
                <p>Full-grain leather, silver zipper detailing, tailored fit, soft inner lining.</p>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "tab-pane-3" ? "show active" : ""}`}
                id="tab-pane-3"
              >
                <div className="review-container" style={{ padding: "20px", overflow: "visible", width: "80%" }}>
                  <ReviewComponent productId={product._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetails;
