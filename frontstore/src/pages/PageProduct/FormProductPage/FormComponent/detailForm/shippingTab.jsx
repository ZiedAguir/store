
const ShippingTab = ({ formData,handleInputChange, handleNestedInputChange }) => {
  return (
    <div className="tab-pane fade" id="shipping" role="tabpanel" aria-labelledby="shipping-tab">
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Weight (kg)
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="weight"
            value={formData?.weight ?? 0}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Dimensions (cm)
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="dimensions.length"
            value={formData?.dimensions?.length ?? 0}
            onChange={handleNestedInputChange}
          />
          <input
            type="number"
            className="form-control form-control-modern"
            name="dimensions.width"
            value={formData?.dimensions?.width ?? 0}
            onChange={handleNestedInputChange}
          />
          <input
            type="number"
            className="form-control form-control-modern"
            name="dimensions.height"
            value={formData?.dimensions?.height ?? 0}
            onChange={handleNestedInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingTab;