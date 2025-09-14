const AttributesTab = ({ formData, handleInputChange, inputSizes, inputColors, handleInputBlur }) => {
  return (
    <div className="tab-pane fade" id="attributes" role="tabpanel" aria-labelledby="attributes-tab">
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Sizes
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="text"
            className="form-control form-control-modern"
            name="sizes"
            value={inputSizes}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInputBlur(e);
              }
            }}
          />
          <div className="mt-2">
            {(Array.isArray(formData?.sizes) ? formData.sizes : []).map((size, index) => (
              <span key={index} className="badge bg-primary me-1">
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Colors
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="text"
            className="form-control form-control-modern"
            name="colors"
            value={inputColors}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInputBlur(e);
              }
            }}
          />
          <div className="mt-2">
            {(Array.isArray(formData?.colors) ? formData.colors : []).map((color, index) => (
              <span key={index} className="badge bg-success me-1">
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributesTab;
