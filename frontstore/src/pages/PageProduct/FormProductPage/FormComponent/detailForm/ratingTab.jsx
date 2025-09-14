
const RatingTab = ({ formData, handleInputChange, ratingErrors }) => {
  return (
    <div className="tab-pane fade" id="rating" role="tabpanel" aria-labelledby="rating-tab">
      {/* Rating validation rules info */}
     
      
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Ratings Average
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className={`form-control form-control-modern ${ratingErrors?.ratingsAverage ? 'is-invalid' : ''}`}
            name="ratingsAverage"
            value={formData.ratingsAverage}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="1"
            placeholder="0 to 5"
          />
          {ratingErrors?.ratingsAverage && (
            <div className="invalid-feedback">
              {ratingErrors.ratingsAverage}
            </div>
          )}
          <small className="form-text text-muted">
            Enter a value between 0.0 and 5.0 (e.g., 4.5 for 4.5 stars)
          </small>
        </div>
      </div>
      
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Ratings Quantity
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className={`form-control form-control-modern ${ratingErrors?.ratingsQuantity ? 'is-invalid' : ''}`}
            name="ratingsQuantity"
            value={formData.ratingsQuantity}
            onChange={handleInputChange}
            min="0"
            placeholder="Number of ratings received"
          />
          {ratingErrors?.ratingsQuantity && (
            <div className="invalid-feedback">
              {ratingErrors.ratingsQuantity}
            </div>
          )}
          <small className="form-text text-muted">
            Total number of ratings this product has received
          </small>
        </div>
      </div>
    </div>
  );
};

export default RatingTab;