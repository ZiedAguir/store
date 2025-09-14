import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: [],
  filteredSubCategories: [],
  isFetching: false,
  error: false,
  limit: 12,
};

const setLoading = (state) => {
  state.isFetching = true;
  state.error = false;
};

const setError = (state) => {
  state.isFetching = false;
  state.error = true;
};

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    // GET ALL SUBCATEGORIES
    getSubCategoriesStart: setLoading,
    getSubCategoriesSuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories = action.payload;
      state.filteredSubCategories = action.payload;
    },
    getSubCategoriesFailure: setError,

    // GET SUBCATEGORY BY NAME
    getSubCategoryByNameStart: setLoading,
    getSubCategoryByNameSuccess: (state, action) => {
      state.isFetching = false;
      state.filteredSubCategories = action.payload;
    },
    getSubCategoryByNameFailure: setError,

    // GET SUBCATEGORY BY ID
    getSubCategoryByIdStart: setLoading,
    getSubCategoryByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.filteredSubCategories = [action.payload];
    },
    getSubCategoryByIdFailure: setError,

    // CREATE SUBCATEGORY
    createSubCategoryStart: setLoading,
    createSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories.push(action.payload);
    },
    createSubCategoryFailure: setError,

    // UPDATE SUBCATEGORY
    updateSubCategoryStart: setLoading,
    updateSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories = state.subCategories.map((subCategory) =>
        subCategory.id === action.payload.id ? action.payload : subCategory
      );
    },
    updateSubCategoryFailure: setError,

    // DELETE SUBCATEGORY
    deleteSubCategoryStart: setLoading,
    deleteSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory.id !== action.payload
      );
    },
    deleteSubCategoryFailure: setError,

    // SET LIMIT
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const {
  getSubCategoriesStart,
  getSubCategoriesSuccess,
  getSubCategoriesFailure,
  getSubCategoryByIdStart,
  getSubCategoryByIdSuccess,
  getSubCategoryByIdFailure,
  getSubCategoryByNameStart,
  getSubCategoryByNameSuccess,
  getSubCategoryByNameFailure,
  createSubCategoryStart,
  createSubCategorySuccess,
  createSubCategoryFailure,
  updateSubCategoryStart,
  updateSubCategorySuccess,
  updateSubCategoryFailure,
  deleteSubCategoryStart,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,
  setLimit,
} = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;