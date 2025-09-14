import { useContext, useState } from "react";
import { FormContext } from "../../context/AuthContext";

function StatusComponent() {
  const { formData, setFormData } = useContext(FormContext); // Importer les données du contexte
  const initialStatus = formData.step1?.status || "active"; // Statut initial
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    // Mettre à jour le contexte avec le nouveau statut
    setFormData((prevData) => ({
      ...prevData,
      step1: {
        ...prevData.step1,
        status: newStatus,
      },
    }));
  };

  return (
    <div className="statusbox">
      <a href="#" data-bs-toggle="dropdown">
        <span className="status-info">
          <strong style={{ margin: "10px" }}>Status:</strong>
        </span>
        <span className="status-value">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        <i className="fas fa-chevron-down text-color-dark" />
      </a>
      <div className="dropdown-menu">
        <ul className="list-unstyled">
          <li style={{ margin: "10px" }}>
            <a
              role="menuitem"
              tabIndex={-1}
              href="#"
              onClick={() => handleStatusChange("active")}
            >
              Active
            </a>
          </li>
          <li style={{ margin: "10px" }}>
            <a
              role="menuitem"
              tabIndex={-1}
              href="#"
              onClick={() => handleStatusChange("maintenance")}
            >
              In Maintenance
            </a>
          </li>
          <li style={{ margin: "10px" }}>
            <a
              role="menuitem"
              tabIndex={-1}
              href="#"
              onClick={() => handleStatusChange("inactive")}
            >
              Inactive
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StatusComponent;
