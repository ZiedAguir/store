import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import ImageUploadSection from './ComponenetsFormCtegory/imageUploadSection';
import CategoryDetailsSection from './ComponenetsFormCtegory/categoryDetailsSection';
import ActionButtons from './ComponenetsFormCtegory/actionButtons';
import { useNavigate, useParams } from 'react-router-dom';
import { addCategory, deleteCategory, updateCategory, fetchCategories } from '../../../Redux/Action/categoriesActions';

function FormHomeCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;


  const [formData, setFormData] = useState({
    name: '',
    parentCategory: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('parentCategory', formData.parentCategory);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    if (isEditMode) {
      dispatch(updateCategory(id, formDataToSend))
        .unwrap()
        .then(() => navigate('/ListCategories'))
        .catch((error) => console.error('Update failed:', error));
    } else {
      dispatch(addCategory(formDataToSend))
        .unwrap()
        .then(() => navigate('/ListCategories'))
        .catch((error) => console.error('Add failed:', error));
    }
  };

  const handleDelete = () => {
    if (isEditMode) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => navigate('/ListCategories'))
        .catch((error) => console.error('Delete failed:', error));
    }
  };

  return (
    <section role="main" className="content-body content-body-modern mt-0">
      <header className="page-header page-header-left-inline-breadcrumb">
        <h2 className="font-weight-bold text-6">{isEditMode ? 'Edit Category' : 'Add Category'}</h2>
        <div className="right-wrapper">
          <ol className="breadcrumbs">
            <li><span>Home</span></li>
            <li><span>eCommerce</span></li>
            <li><span>Categories</span></li>
          </ol>
          
        </div>
        <div className="d-flex align-items-center justify-content-between px-3 mt-2">
         <button className="checkout-back btn btn-light btn-sm" onClick={() => window.history.back()} title="Retour">
           <i className="fas fa-arrow-left" />
         </button>
       </div>
      </header>

      <motion.form
        className="ecommerce-form action-buttons-fixed"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="row mt-2">
          <div className="col">
            <ImageUploadSection onImageUpload={handleImageUpload} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <CategoryDetailsSection formData={formData} onInputChange={handleInputChange} />
          </div>
        </div>

        <ActionButtons onDelete={handleDelete} isEditMode={isEditMode} />
      </motion.form>
    </section>
  );
}

export default FormHomeCategory;
