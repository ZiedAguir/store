import { motion } from 'framer-motion';

const ActionButtons = ({ onDelete, isEditMode }) => {
  return (
    <div className="row">
      <div className="col-12 col-md-auto">
        <motion.button
          type="submit"
          className="submit-button btn btn-primary btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
          data-loading-text="Loading..."
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <i className="bx bx-save text-4 me-2" /> {isEditMode ? 'Update Category' : 'Save Category'}
        </motion.button>
      </div>
      <div className="col-12 col-md-auto px-md-0 mt-3 mt-md-0">
        <a
          href="/ListCategories"
          className="cancel-button btn btn-light btn-px-4 py-3 border font-weight-semibold text-color-dark text-3"
        >
          Cancel
        </a>
      </div>
      {isEditMode && (
        <div className="col-12 col-md-auto ms-md-auto mt-3 mt-md-0 ms-auto" style={{backgroundColor:"red"}}>
          <button
            type="button"
            onClick={onDelete}
            className="delete-button btn btn-danger btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
          >
            <i className="bx bx-trash text-4 me-2" /> Delete Category
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;