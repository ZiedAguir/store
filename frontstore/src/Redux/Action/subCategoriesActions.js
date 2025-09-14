import apiRequest from "../../componnent/axios/axiosInstance";
import {
  getSubCategoriesStart,
  getSubCategoriesSuccess,
  getSubCategoriesFailure,
  getSubCategoryByIdStart,
  getSubCategoryByIdSuccess,
  getSubCategoryByIdFailure,
  createSubCategoryStart,
  createSubCategorySuccess,
  createSubCategoryFailure,
  updateSubCategoryStart,
  updateSubCategorySuccess,
  updateSubCategoryFailure,
  deleteSubCategoryStart,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,
  getSubCategoryByNameStart,
  getSubCategoryByNameSuccess,
  getSubCategoryByNameFailure,
} from "../slices/subCategoriesSlice";

// **Récupérer les sous-catégories par nom**
export const fetchSubCategoryByName = (name) => async (dispatch) => {
  dispatch(getSubCategoryByNameStart());
  try {
    const res = await apiRequest.get(`/subcategories/name/${name}`);
    if (res.data.data.length === 0) {
      dispatch(getSubCategoryByNameSuccess([]));
    } else {
      dispatch(getSubCategoryByNameSuccess(res.data.data));
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch(getSubCategoryByNameSuccess([]));
    } else {
      dispatch(getSubCategoryByNameFailure());
      console.error("Error fetching subcategories by name:", error);
    }
  }
};

// **Récupérer toutes les sous-catégories**
export const fetchSubCategories = () => async (dispatch, getState) => {
  dispatch(getSubCategoriesStart());
  try {
    const { limit } = getState().subCategories;
    const res = await apiRequest.get(`/subcategories?limit=${limit}`);
    const subCategoriesWithIndex = res.data.data.map((subCategory, index) => ({
      ...subCategory,
      index: index + 1,
    }));
    dispatch(getSubCategoriesSuccess(subCategoriesWithIndex));
  } catch (error) {
    dispatch(getSubCategoriesFailure());
    console.error("Error fetching subcategories:", error);
  }
};

// **Récupérer une sous-catégorie par ID**
export const fetchSubCategoryById = (id) => async (dispatch) => {
  dispatch(getSubCategoryByIdStart());
  try {
    const res = await apiRequest.get(`/subcategories/${id}`);
    dispatch(getSubCategoryByIdSuccess(res.data.data));
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Invalid subcategory ID format:", error.response.data);
    } else {
      console.error("Error fetching subcategory by ID:", error);
    }
    dispatch(getSubCategoryByIdFailure());
  }
};

// **Créer une sous-catégorie**
export const addSubCategory = (subCategoryData) => async (dispatch) => {
  dispatch(createSubCategoryStart());
  try {
    const res = await apiRequest.post("/subcategories", subCategoryData);
    dispatch(createSubCategorySuccess(res.data.data));
  } catch (error) {
    dispatch(createSubCategoryFailure());
    console.error("Error creating subcategory:", error);
  }
};

// **Mettre à jour une sous-catégorie**
export const updateSubCategory = (id, subCategoryData) => async (dispatch) => {
  dispatch(updateSubCategoryStart());
  try {
    const res = await apiRequest.put(`/subcategories/${id}`, subCategoryData);
    dispatch(updateSubCategorySuccess(res.data.data));
  } catch (error) {
    dispatch(updateSubCategoryFailure());
    console.error("Error updating subcategory:", error);
  }
};

// **Supprimer une sous-catégorie**
export const deleteSubCategory = (id) => async (dispatch) => {
  dispatch(deleteSubCategoryStart());
  try {
    await apiRequest.delete(`/subcategories/${id}`);
    dispatch(deleteSubCategorySuccess(id));
  } catch (error) {
    dispatch(deleteSubCategoryFailure());
    console.error("Error deleting subcategory:", error);
  }
};