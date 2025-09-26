import TabNavigation from "./detailForm/tabNavigation";
import PriceTab from "./detailForm/priceTab";
import InventoryTab from "./detailForm/inventoryTab";
import ShippingTab from "./detailForm/shippingTab";
import AttributesTab from "./detailForm/attributesTab";
import AdvancedTab from "./detailForm/advancedTab";
import RatingTab from "./detailForm/ratingTab";
import { useState } from "react";
import CategoryInfo from "./detailForm/categoryInfo";
const DetailProduct = ({ formData, onInputChange, onNestedInputChange ,inputSizes, inputColors, handleInputBlur, priceErrors, ratingErrors}) => {
  const [activeTab, setActiveTab] = useState("price");

  const tabs = [
    { id: "price", label: "Price" },
    { id: "inventory", label: "Inventory" },
    { id: "shipping", label: "Shipping" },
    { id: "attributes", label: "Sizes & Colors" },
    { id: "advanced", label: "Advanced" },
    { id: "rating", label: "Rating" },
    { id: "category", label: "Category" },

  ];

  return (
    <div className="row">
      <div className="col">
        <section className="card card-modern card-big-info">
          <div className="card-body" style={{ cursor: "pointer" }}>
            <div className="tabs-modern row" style={{ minHeight: 490 }}>
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="col-lg-3-5 col-xl-4-5">
                <div className="tab-content" id="tabContent">
                  <PriceTab formData={formData} handleInputChange={onInputChange} priceErrors={priceErrors} activeTab={activeTab} />
                  <InventoryTab formData={formData} handleInputChange={onInputChange} activeTab={activeTab} />
                  <ShippingTab formData={formData} handleInputChange={onInputChange} handleNestedInputChange={onNestedInputChange} activeTab={activeTab} />
                  <AttributesTab formData={formData} handleInputChange={onInputChange}  inputSizes={inputSizes} inputColors={inputColors} handleInputBlur={handleInputBlur} activeTab={activeTab} />
                  <AdvancedTab formData={formData} handleInputChange={onInputChange} activeTab={activeTab} />
                  <RatingTab formData={formData} handleInputChange={onInputChange} ratingErrors={ratingErrors} activeTab={activeTab} />
                  <CategoryInfo formData={formData} handleInputChange={onInputChange} activeTab={activeTab}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailProduct;