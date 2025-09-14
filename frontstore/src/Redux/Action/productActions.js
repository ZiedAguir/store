import apiRequest from "../../componnent/axios/axiosInstance";
import { 
  getProductStart, getProductSuccess, getProductFailure, 
  deleteProductStart, deleteProductSuccess, deleteProductFailure,
  updateProductStart, updateProductSuccess, updateProductFailure,
  addProductStart, addProductSuccess, addProductFailure,
  getPendingStart, getPendingSuccess, getPendingFailure,
  approveProductSuccess, rejectProductSuccess
} from "../slices/productSlice.js";
import { getMyProductsStart, getMyProductsSuccess, getMyProductsFailure } from "../slices/productSlice.js";

// **Filtrer les produits**
export const filterProducts = (filters, page = 1) => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await apiRequest.get("/products", {
      params: {
        'price[gte]': filters.minPrice,
        'price[lte]': filters.maxPrice,
        category: filters.categories.length > 0 ? filters.categories.join(',') : undefined, 
        page, 
      },
    });
    console.log('Full API Filter Request URL:', response.config.url);
    console.log('API Filter Response:', response.data);
    dispatch(getProductSuccess(response.data));
  } catch (error) {
    dispatch(getProductFailure());
    console.error("Error filtering products:", error);
  }
};

// **Récupérer tous les produits**
export const fetchProducts = (page = 1) => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await apiRequest.get("/products", {
      params: { page }, 
    });
    console.log('Full API Fetch Request URL:', res.config.url);
    console.log('API Fetch Response:', res.data);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
    console.log(error);
  }
};

// **Ajouter un produit**
export const addProduct = (productData) => async (dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await apiRequest.post("/products", productData);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
    console.log(error);
  }
};

// **Mettre à jour un produit**
export const updateProduct = (id, updatedData) => async (dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await apiRequest.put(`/products/${id}`, updatedData);
    dispatch(updateProductSuccess({ id, product: res.data }));
  } catch (error) {
    dispatch(updateProductFailure());
    console.log(error);
  }
};

// **Supprimer un produit**
export const deleteProduct = (id) => async (dispatch) => {
  dispatch(deleteProductStart());
  try {
    await apiRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
    console.log(error);
  }
};

// ADMIN: Get pending products
export const fetchPendingProducts = () => async (dispatch) => {
  dispatch(getPendingStart());
  try {
    const res = await apiRequest.get(`/products/pending`);
    dispatch(getPendingSuccess(res.data));
  } catch (error) {
    dispatch(getPendingFailure());
    console.log(error);
  }
};

// ADMIN: Approve product
export const approveProduct = (id) => async (dispatch) => {
  try {
    const res = await apiRequest.patch(`/products/${id}/approve`);
    dispatch(approveProductSuccess(res.data.data || res.data));
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN: Reject product with reason
export const rejectProduct = (id, reason) => async (dispatch) => {
  try {
    const res = await apiRequest.patch(`/products/${id}/reject`, { reason });
    dispatch(rejectProductSuccess(res.data.data || res.data));
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// USER: Get my products with statuses
export const fetchMyProducts = () => async (dispatch) => {
  dispatch(getMyProductsStart());
  try {
    const res = await apiRequest.get(`/products/mine`);
    dispatch(getMyProductsSuccess(res.data));
  } catch (error) {
    dispatch(getMyProductsFailure());
    console.log(error);
  }
};
