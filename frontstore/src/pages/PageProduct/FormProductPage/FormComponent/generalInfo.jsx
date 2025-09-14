const GeneralInfo = ({ formData, handleInputChange }) => {
  if (!formData) return null; 

  return (
    <div className="row mt-2">
      <div className="col">
        <section className="card card-modern card-big-info">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-2-5 col-xl-1-5" style={{ backgroundColor: "#3ce7dd" }}>
                <i className="card-big-info-icon bx bx-box" />
                <h2 className="card-big-info-title">General Info</h2>
                <p className="card-big-info-desc">
                  Add here the product description with all details and necessary information.
                </p>
              </div>
              <div className="col-lg-3-5 col-xl-4-5">
                {/* Champ pour le titre du produit */}
                <div className="form-group row align-items-center pb-3">
                  <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                    Product Name
                  </label>
                  <div className="col-lg-7 col-xl-6">
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Champ pour la description du produit */}
                <div className="form-group row">
                  <label className="col-lg-5 col-xl-3 control-label text-lg-end pt-2 mt-1 mb-0">
                    Product Description
                  </label>
                  <div className="col-lg-7 col-xl-6">
                    <textarea
                      className="form-control form-control-modern"
                      name="description"
                      rows={6}
                      value={formData.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GeneralInfo;
