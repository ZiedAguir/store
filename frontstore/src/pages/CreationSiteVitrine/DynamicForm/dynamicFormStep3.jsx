import PropTypes from "prop-types";

function DynamicForm3({ fieldsConfig, selectedPages, formSelections, onPageChange, onOptionChange }) {
  return (
    <ul className="page-list">
      {fieldsConfig.map((pageConfig) => {
        const isPageSelected = selectedPages.includes(pageConfig.pageName);
        const pageComponents = formSelections[pageConfig.pageName] || [];
        const allComponentsSelected = pageComponents.length === pageConfig.options.length;
        
        return (
          <li key={pageConfig.pageName} className="page-item">
            <label className="page-label">
              <input
                type="checkbox"
                checked={isPageSelected}
                onChange={() => onPageChange(pageConfig.pageName)}
              />
              <span className="page-link">{pageConfig.pageLabel}</span>
              {isPageSelected && allComponentsSelected && (
                <span className="badge bg-success ms-2">
                  <i className="fas fa-check me-1"></i>All Components Selected
                </span>
              )}
            </label>

            {isPageSelected && (
              <ul className="components-list">
                {pageConfig.options.map((option, index) => (
                  <li key={`${pageConfig.pageName}-${option.key}-${index}`} className="component-item">
                    <label className="component-label">
                      <input
                        type="checkbox"
                        checked={pageComponents.includes(option.key)}
                        onChange={() => onOptionChange(pageConfig.pageName, option.key)}
                      />
                      <span className="component-text">{option.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

DynamicForm3.propTypes = {
  fieldsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      pageName: PropTypes.string.isRequired,
      pageLabel: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  selectedPages: PropTypes.arrayOf(PropTypes.string).isRequired,
  formSelections: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

export default DynamicForm3;


