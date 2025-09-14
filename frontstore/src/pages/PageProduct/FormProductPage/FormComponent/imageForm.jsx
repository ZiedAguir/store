const ImageForm = ({
  formData,
  handleInputChange,
}) => {
  // Function to handle file upload for image cover
  const handleImageCoverUpload = (e) => {
    const file = e.target.files[0];
    handleInputChange({
      target: {
        name: "imageCover",
        value: file, 
      },
    });
  };

  // Function to handle file upload for additional images
  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("files images",files)
    handleInputChange({
      target: {
        name: "images",
        value: files, 
      },
    });
  };

  return (
    <div className="row">
      <div className="col">
        <section className="card card-modern card-big-info">
          <div className="card-body">
            <div className="row">
              <div
                className="col-lg-2-5 col-xl-1-5"
                style={{ backgroundColor: "#3ce7dd" }}
              >
                <i className="card-big-info-icon bx bx-camera" />
                <h2 className="card-big-info-title" style={{ cursor: "pointer" }}>
                  Product Image
                </h2>
                <p className="card-big-info-desc">
                  Upload your Product image. You can add multiple images.
                </p>
              </div>
              <div className="col-lg-3-5 col-xl-4-5">
                {/* Cover image field */}
                <div className="form-group row align-items-center pb-3">
                  <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                    Image Cover
                  </label>
                  <div className="col-lg-7 col-xl-6">
                    <input
                      type="file"
                      onChange={handleImageCoverUpload}
                      accept="image/*"
                    />
                    {formData?.imageCover && (
                      <img
                        src={
                          typeof formData.imageCover === "string"
                            ? formData.imageCover
                            : URL.createObjectURL(formData.imageCover)
                        }
                        alt="Cover"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginTop: "10px",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Additional images field */}
                <div className="form-group row align-items-center">
                  <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                    Additional Images
                  </label>
                  <div className="col-lg-7 col-xl-6">
                    <input
                      type="file"
                      onChange={handleAdditionalImagesUpload}
                      accept="image/*"
                      multiple
                    />
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    >
                      {Array.isArray(formData?.images) && formData.images.length > 0 &&
                        formData.images.map((image, index) => (
                          <img
                            key={index}
                            src={
                              typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            }
                            alt={`Product ${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              margin: "5px",
                            }}
                          />
                        ))}
                    </div>
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

export default ImageForm;
