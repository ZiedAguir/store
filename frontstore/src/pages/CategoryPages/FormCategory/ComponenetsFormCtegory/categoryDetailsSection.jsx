import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const CategoryDetailsSection = ({ formData, onInputChange }) => {
  // Récupérer les catégories depuis Redux
  const categories = useSelector((state) => state.categories.categories);

  return (
    <motion.section
      className="card card-modern card-big-info"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-lg-2-5 col-xl-1-5">
            <i className="card-big-info-icon bx bx-slider" />
            <h2 className="card-big-info-title">Category Details</h2>
            <p className="card-big-info-desc">
              Add here the category description with all details and necessary information.
            </p>
          </div>
          <div className="col-lg-3-5 col-xl-4-5">
            <motion.div
              className="form-group row align-items-center mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                Category Name
              </label>
              <div className="col-lg-7 col-xl-6">
                <input
                  type="text"
                  className="form-control form-control-modern"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="form-group row align-items-center mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                Parent Category
              </label>
              <div className="col-lg-7 col-xl-6">
                <select
                  className="form-control form-control-modern"
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={onInputChange}
                >
                  <option value="">Select a parent category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CategoryDetailsSection;