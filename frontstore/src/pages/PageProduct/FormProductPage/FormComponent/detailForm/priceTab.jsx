const PriceTab = ({ formData, handleInputChange, priceErrors }) => {
  return (
    <div className="tab-pane fade show active" id="price" role="tabpanel" aria-labelledby="price-tab">
      {/* Price validation rules info */}
     
      
      {/* General price validation error */}
      {priceErrors?.general && (
        <div className="alert alert-danger mb-3">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {priceErrors.general}
        </div>
      )}
      
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Price ($)
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className={`form-control form-control-modern ${priceErrors?.price ? 'is-invalid' : ''}`}
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
          {priceErrors?.price && (
            <div className="invalid-feedback">
              {priceErrors.price}
            </div>
          )}
        </div>
      </div>
      
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Price After Discount ($)
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className={`form-control form-control-modern ${priceErrors?.priceAfterDiscount ? 'is-invalid' : ''}`}
            name="priceAfterDiscount"
            value={formData.priceAfterDiscount}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
          {priceErrors?.priceAfterDiscount && (
            <div className="invalid-feedback">
              {priceErrors.priceAfterDiscount}
            </div>
          )}
          <small className="form-text text-muted">
            Leave empty if no discount. Must be less than the main price.
          </small>
        </div>
      </div>
    </div>
  );
};

export default PriceTab;