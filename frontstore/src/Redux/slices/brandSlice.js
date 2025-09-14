import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  filteredBrands: [],
  isFetching: false,
  error: false,
  limit: 5,
};

const setLoading = (state) => {
  state.isFetching = true;
  state.error = false;
};

const setError = (state) => {
  state.isFetching = false;
  state.error = true;
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    // GET ALL BRANDS
    getBrandsStart: setLoading,
    getBrandsSuccess: (state, action) => {
      state.isFetching = false;
      state.brands = action.payload;
      state.filteredBrands = action.payload;
    },
    getBrandsFailure: setError,

    // GET BRAND BY NAME
    getBrandByNameStart: setLoading,
    getBrandByNameSuccess: (state, action) => {
      state.isFetching = false;
      state.filteredBrands = action.payload;
    },
    getBrandByNameFailure: setError,

    // GET BRAND BY ID
    getBrandByIdStart: setLoading,
    getBrandByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.filteredBrands = [action.payload];
    },
    getBrandByIdFailure: setError,

    // CREATE BRAND
    createBrandStart: setLoading,
    createBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands.push(action.payload);
    },
    createBrandFailure: setError,

    // UPDATE BRAND
    updateBrandStart: setLoading,
    updateBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands = state.brands.map((brand) =>
        brand.id === action.payload.id ? action.payload : brand
      );
    },
    updateBrandFailure: setError,

    // DELETE BRAND
    deleteBrandStart: setLoading,
    deleteBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      );
    },
    deleteBrandFailure: setError,

    // SET LIMIT
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const {
  getBrandsStart,
  getBrandsSuccess,
  getBrandsFailure,
  getBrandByIdStart,
  getBrandByIdSuccess,
  getBrandByIdFailure,
  getBrandByNameStart,
  getBrandByNameSuccess,
  getBrandByNameFailure,
  createBrandStart,
  createBrandSuccess,
  createBrandFailure,
  updateBrandStart,
  updateBrandSuccess,
  updateBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  deleteBrandFailure,
  setLimit,
} = brandSlice.actions;

export default brandSlice.reducer;