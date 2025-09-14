import fieldsConfigStep2 from "../FieldsConfig/fieldsConfigStep2";

const DynamicForm2 = ({ formData, handleChange }) => {
  return (
    <div>
      {Object.keys(fieldsConfigStep2).map((key) => {
        const config = fieldsConfigStep2[key];

        switch (config.type) {
          case "file":
            return (
              <div key={key} className="form-group row pb-3">
                <label className="col-sm-3 control-label text-sm-end pt-2">
                  {config.label}{" "}
                  {config.required && <span className="required">*</span>}
                </label>
                <div className="col-sm-9">
                  <input
                    type="file"
                    accept={config.accept}
                    className="form-control"
                    name={key}
                    onChange={(e) => handleChange(e)}
                  />
                  {formData[key] && (
                    <div className="mt-2">
                      {typeof formData[key] === "string" ? (
                        // If it's a string URL, display the image
                        <img
                          src={formData[key]}
                          alt="Logo"
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        // If it's a File object, display a preview
                        formData[key] instanceof File && (
                          <div>
                            <p>Fichier sélectionné: {formData[key].name}</p>
                            <img
                              src={URL.createObjectURL(formData[key])}
                              alt="Aperçu du logo"
                              style={{ width: "100px", height: "100px" }}
                              onLoad={() => URL.revokeObjectURL(formData[key])} 
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );

          case "text":
          case "number":
            return (
              <div key={key} className="form-group row pb-3">
                <label className="col-sm-3 control-label text-sm-end pt-2">
                  {config.label}{" "}
                  {config.required && <span className="required">*</span>}
                </label>
                <div className="col-sm-9">
                  <input
                    type={config.type}
                    name={key}
                    className="form-control"
                    placeholder={config.placeholder}
                    onChange={handleChange}
                    value={formData[key] || ""}
                    required={config.required}
                  />
                </div>
              </div>
            );

          case "textarea":
            return (
              <div key={key} className="form-group row pb-3">
                <label className="col-sm-3 control-label text-sm-end pt-2">
                  {config.label}{" "}
                  {config.required && <span className="required">*</span>}
                </label>
                <div className="col-sm-9">
                  <textarea
                    name={key}
                    rows={config.rows}
                    className="form-control"
                    placeholder={config.placeholder}
                    onChange={handleChange}
                    value={formData[key] || ""}
                    required={config.required}
                  />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DynamicForm2;
