import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  filteredCategories: [],
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // GET ALL CATEGORIES
    getCategoriesStart: setLoading,
    getCategoriesSuccess: (state, action) => {
      state.isFetching = false;
      state.categories = action.payload;
      state.filteredCategories = action.payload;
    },
    getCategoriesFailure: setError,

    // GET CATEGORY BY NAME
    getCategoryByNameStart: setLoading,
    getCategoryByNameSuccess: (state, action) => {
      state.isFetching = false;
      state.filteredCategories = action.payload;
    },
    getCategoryByNameFailure: setError,

    // GET CATEGORY BY ID
    getCategoryByIdStart: setLoading,
    getCategoryByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.filteredCategories = [action.payload];
    },
    getCategoryByIdFailure: setError,

    // CREATE CATEGORY
    createCategoryStart: setLoading,
    createCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories.push(action.payload);
    },
    createCategoryFailure: setError,

    // UPDATE CATEGORY
    updateCategoryStart: setLoading,
    updateCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
    },
    updateCategoryFailure: setError,

    // DELETE CATEGORY
    deleteCategoryStart: setLoading,
    deleteCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    deleteCategoryFailure: setError,

    // SET LIMIT
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategoryByIdStart,
  getCategoryByIdSuccess,
  getCategoryByIdFailure,
  getCategoryByNameStart,
  getCategoryByNameSuccess,
  getCategoryByNameFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  setLimit, 
} = categoriesSlice.actions;

export default categoriesSlice.reducer;