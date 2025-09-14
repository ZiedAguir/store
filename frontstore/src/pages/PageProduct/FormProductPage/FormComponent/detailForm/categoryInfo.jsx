import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../../Redux/Action/categoriesActions"; 

const CategoryInfo = ({ formData, handleInputChange }) => {
  const dispatch = useDispatch();

  // Récupérer les catégories depuis Redux
  const categoryList = useSelector((state) => state.categories); 
  const { isFetching, categories, error } = categoryList;

  // Charger les catégories au montage du composant
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Vérifier que categories est un tableau avant d'utiliser .map
  const categoriesArray = Array.isArray(categories) ? categories : [];
  console.log("categoriesArray :", categoriesArray);

  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Select a category</option>
            {isFetching ? (
              <option>Loading...</option>
            ) : error ? (
              <option>Error loading categories</option>
            ) : (
              categoriesArray.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryInfo;