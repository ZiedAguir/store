import PhoneInput from "react-phone-input-2"; // Import the PhoneInput component
import "react-phone-input-2/lib/style.css";
import { fieldsConfig } from "../FieldsConfig/fieldsConfigStep1";

const DynamicForm = ({ formData, handleChange, handlePhoneChange }) => {
  return Object.keys(fieldsConfig).map((key) => {
    const field = fieldsConfig[key];
    if (field.type === "phone") {
      return (
        <div key={key} className="form-group row pb-3">
          <label className="col-sm-3 control-label text-sm-end pt-2">
            {field.label}{" "}
            {field.required && <span className="required">*</span>}
          </label>
          <div className="col-sm-9">
            <PhoneInput
              country={"us"} 
              value={String(formData[key] || "")} 
              onChange={(value) => handlePhoneChange(value, key)}
              placeholder="Enter phone number"
              inputClass="form-control"
              enableSearch={true}
              disableDropdown={false}
              countryCodeEditable={true}
              searchPlaceholder="Search country"
              enableAreaCodes={true} 
            />
          </div>
        </div>
      );
    } else if (field.type === "select") {
      return (
        <div key={key} className="form-group row pb-3">
          <label className="col-sm-3 control-label text-sm-end pt-2">
            {field.label}{" "}
            {field.required && <span className="required">*</span>}
          </label>
          <div className="col-sm-9">
            <select
              name={key}
              className="form-control"
              onChange={handleChange}
              value={formData[key] || ""}
            >
              <option value="" disabled>
                Select your discipline
              </option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className="form-group row pb-3">
          <label className="col-sm-3 control-label text-sm-end pt-2">
            {field.label}{" "}
            {field.required && <span className="required">*</span>}
          </label>
          <div className="col-sm-9">
            <input
              type={field.type}
              name={key}
              className="form-control"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={formData[key] || ""}
              onChange={handleChange}
              required={field.required}
              min={field.min}
              max={field.max}
              step={field.step}
            />
            {field.type === "number" && field.min && field.max && (
              <small className="form-text text-muted">
                {field.label} must be between {field.min} and {field.max}
              </small>
            )}
          </div>
        </div>
      );
    }
  });
};

export default DynamicForm;
