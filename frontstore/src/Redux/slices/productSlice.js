import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  pendingProducts: [],
  myProducts: [],
  isFetching: false,
  error: false,
  pagination: {
    currentPage: 1,
    numberOfPages: 1,
    results: 0,
    next: null,
    prev: null,
  },
};

const setLoading = (state) => {
  state.isFetching = true;
  state.error = false;
};

const setError = (state) => {
  state.isFetching = false;
  state.error = true;
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // GET ALL PRODUCTS
    getProductStart: setLoading,
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.data || []; 
      state.filteredProducts = action.payload.data || []; 
      state.pagination = {
        currentPage: action.payload.paginationResult?.currentPage || 1,
        numberOfPages: action.payload.paginationResult?.numberOfPages || 1,
        results: action.payload.results || 0,
        next: action.payload.paginationResult?.next || null,
        prev: action.payload.paginationResult?.prev || null,
      };
    },
    getProductFailure: setError,

    // PENDING PRODUCTS (Admin)
    getPendingStart: setLoading,
    getPendingSuccess: (state, action) => {
      state.isFetching = false;
      state.pendingProducts = action.payload.data || [];
    },
    getPendingFailure: setError,

    // MY PRODUCTS (User)
    getMyProductsStart: setLoading,
    getMyProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.myProducts = action.payload.data || [];
    },
    getMyProductsFailure: setError,

    // DELETE PRODUCT
    deleteProductStart: setLoading,
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = state.products.filter((item) => item._id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter((item) => item._id !== action.payload);
    },
    deleteProductFailure: setError,

    // UPDATE PRODUCT
    updateProductStart: setLoading,
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = state.products.map((item) =>
        item._id === action.payload.id ? action.payload.product : item
      );
      state.filteredProducts = state.filteredProducts.map((item) =>
        item._id === action.payload.id ? action.payload.product : item
      );
    },    
    updateProductFailure: setError,

    // ADD PRODUCT
    addProductStart: setLoading,
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
    addProductFailure: setError,

    // Approve / Reject update in lists
    approveProductSuccess: (state, action) => {
      const id = action.payload._id || action.payload.data?._id;
      state.pendingProducts = state.pendingProducts.filter(p => p._id !== id);
      // Optionally push into products if currently browsing approved list
    },
    rejectProductSuccess: (state, action) => {
      const id = action.payload._id || action.payload.data?._id;
      state.pendingProducts = state.pendingProducts.filter(p => p._id !== id);
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  getPendingStart,
  getPendingSuccess,
  getPendingFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  approveProductSuccess,
  rejectProductSuccess,
  getMyProductsStart,
  getMyProductsSuccess,
  getMyProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;
