import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { fetchCategories,fetchCategoryById, deleteCategory } from '../../../../Redux/Action/categoriesActions';
import { FormContext } from '../../../../componnent/context/AuthContext';

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(FormContext);
  const { filteredCategories, isFetching, error, categories } = useSelector((state) => state.categories);

  // Check if current user has admin or superadmin role
  const canDelete = currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin' || 
                   currentUser?.role === 'admin' || currentUser?.role === 'superadmin';

  // Check if user data is still loading
  const isUserLoading = !currentUser;

  // Fonction pour obtenir le nom de la catégorie parente
  const getParentCategoryName = (parentId) => {
    if (!parentId) return 'No Parent';
    const parentCategory = categories.find((cat) => cat._id === parentId);
    return parentCategory ? parentCategory.name : 'Unknown';
  };

  const handleCategoryClick = (id) => {
    dispatch(fetchCategoryById(id));
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => {
          dispatch(fetchCategories());
        })
        .catch((error) => {
          console.error('Error deleting category:', error);
        });
    }
  };

  if (isUserLoading) {
    return <p>Loading user data...</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching categories.</p>;
  }

  if (!filteredCategories || filteredCategories.length === 0) {
    return <p>No categories found.</p>;
  }

  return (
    <table className="table table-ecommerce-simple table-striped mb-0" id="datatable-ecommerce-list" style={{ minWidth: 550 }}>
      <thead>
        <tr>
          <th width="3%">
            <input type="checkbox" name="select-all" className="select-all checkbox-style-1 p-relative top-2" defaultValue />
          </th>
          <th width="8%">ID</th>
          <th width="28%">Name</th>
          <th width="23%">Slug</th>
          <th width="38%">Parent Category</th>
          <th width="10%">Actions</th> 
        </tr>
      </thead>
      <tbody>
        {filteredCategories.map((category, index) => (
          <tr key={category._id}>
            <td width={30}>
              <input type="checkbox" name="checkboxRow1" className="checkbox-style-1 p-relative top-2" defaultValue />
            </td>
            <td>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category._id);
                }}
              >
                <strong>{index + 1}</strong>
              </a>
            </td>
            <td>
              <a href="ecommerce-category-form.html">
                <strong>{category.name}</strong>
              </a>
            </td>
            <td>{category.slug}</td>
            <td>{getParentCategoryName(category.parentCategory)}</td>
            <td>
              {canDelete ? (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCategory(category._id)} 
                  title="Delete category (Admin only)"
                >
                  <i className="fas fa-trash me-1"></i>
                  Delete
                </button>
              ) : (
                <span className="text-muted" title="Only admins can delete categories">
                  <i className="fas fa-lock me-1"></i>
                  No access
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;