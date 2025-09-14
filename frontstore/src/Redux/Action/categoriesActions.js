import apiRequest from "../../componnent/axios/axiosInstance";
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategoryByIdStart,
  getCategoryByIdSuccess,
  getCategoryByIdFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  getCategoryByNameStart,
  getCategoryByNameSuccess,
  getCategoryByNameFailure,
} from "../slices/categoriesSlice";


// **Récupérer les catégories par nom**
export const fetchCategoryByName = (name) => async (dispatch) => {
  dispatch(getCategoryByNameStart());
  try {
    const res = await apiRequest.get(`/categories/name/${name}`);
    if (res.data.data.length === 0) {
      dispatch(getCategoryByNameSuccess([])); 
    } else {
      dispatch(getCategoryByNameSuccess(res.data.data)); 
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch(getCategoryByNameSuccess([])); 
    } else {
      dispatch(getCategoryByNameFailure());
      console.error("Error fetching categories by name:", error);
    }
  }
};

// **Récupérer toutes les catégories**
export const fetchCategories = () => async (dispatch, getState) => {
  dispatch(getCategoriesStart());
  try {
    const { limit } = getState().categories; 
    const res = await apiRequest.get(`/categories?limit=${limit}`);
    const categoriesWithIndex = res.data.data.map((category, index) => ({
      ...category,
      index: index + 1,
    }));
    dispatch(getCategoriesSuccess(categoriesWithIndex));
  } catch (error) {
    dispatch(getCategoriesFailure());
    console.error("Error fetching categories:", error);
  }
};

// **Récupérer une catégorie par ID**
export const fetchCategoryById = (id) => async (dispatch) => {
  dispatch(getCategoryByIdStart());
  try {
    const res = await apiRequest.get(`/categories/${id}`);
    dispatch(getCategoryByIdSuccess(res.data.data));
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Invalid category ID format:", error.response.data);
    } else {
      console.error("Error fetching category by ID:", error);
    }
    dispatch(getCategoryByIdFailure());
  }
};

// **Créer une catégorie**
export const addCategory = (categoryData) => async (dispatch) => {
  dispatch(createCategoryStart());
  try {
    const res = await apiRequest.post("/categories", categoryData);
    dispatch(createCategorySuccess(res.data.data));
  } catch (error) {
    dispatch(createCategoryFailure());
    console.error("Error creating category:", error);
  }
};

// **Mettre à jour une catégorie**
export const updateCategory = (id, categoryData) => async (dispatch) => {
  dispatch(updateCategoryStart());
  try {
    const res = await apiRequest.put(`/categories/${id}`, categoryData);
    dispatch(updateCategorySuccess(res.data.data));
  } catch (error) {
    dispatch(updateCategoryFailure());
    console.error("Error updating category:", error);
  }
};

// **Supprimer une catégorie**
export const deleteCategory = (id) => async (dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    await apiRequest.delete(`/categories/${id}`);
    dispatch(deleteCategorySuccess(id));
  } catch (error) {
    dispatch(deleteCategoryFailure());
    console.error("Error deleting category:", error);
  }
};