const AdvancedTab = ({ formData, handleInputChange }) => {
  return (
    <div className="tab-pane fade" id="advanced" role="tabpanel" aria-labelledby="advanced-tab">
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Purchase Note
        </label>
        <div className="col-lg-7 col-xl-6">
          <textarea
            className="form-control form-control-modern"
            name="purchaseNote"
            value={formData.purchaseNote}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Menu Order
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="menuOrder"
            value={formData.menuOrder}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedTab;