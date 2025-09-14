import apiRequest from "../../componnent/axios/axiosInstance";
import {
  getBrandsStart,
  getBrandsSuccess,
  getBrandsFailure,
  getBrandByIdStart,
  getBrandByIdSuccess,
  getBrandByIdFailure,
  createBrandStart,
  createBrandSuccess,
  createBrandFailure,
  updateBrandStart,
  updateBrandSuccess,
  updateBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  deleteBrandFailure,
  getBrandByNameStart,
  getBrandByNameSuccess,
  getBrandByNameFailure,
} from "../slices/brandSlice";

// **Récupérer les marques par nom**
export const fetchBrandByName = (name) => async (dispatch) => {
  dispatch(getBrandByNameStart());
  try {
    const res = await apiRequest.get(`/brands/name/${name}`);
    if (res.data.data.length === 0) {
      dispatch(getBrandByNameSuccess([]));
    } else {
      dispatch(getBrandByNameSuccess(res.data.data));
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch(getBrandByNameSuccess([]));
    } else {
      dispatch(getBrandByNameFailure());
      console.error("Error fetching brands by name:", error);
    }
  }
};

// **Récupérer toutes les marques**
export const fetchBrands = () => async (dispatch, getState) => {
  dispatch(getBrandsStart());
  try {
    const { limit } = getState().brands;
    const res = await apiRequest.get(`/brands?limit=${limit}`);
    const brandsWithIndex = res.data.data.map((brand, index) => ({
      ...brand,
      index: index + 1,
    }));
    dispatch(getBrandsSuccess(brandsWithIndex));
  } catch (error) {
    dispatch(getBrandsFailure());
    console.error("Error fetching brands:", error);
  }
};

// **Récupérer une marque par ID**
export const fetchBrandById = (id) => async (dispatch) => {
  dispatch(getBrandByIdStart());
  try {
    const res = await apiRequest.get(`/brands/${id}`);
    dispatch(getBrandByIdSuccess(res.data.data));
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Invalid brand ID format:", error.response.data);
    } else {
      console.error("Error fetching brand by ID:", error);
    }
    dispatch(getBrandByIdFailure());
  }
};

// **Créer une marque**
export const addBrand = (brandData) => async (dispatch) => {
  dispatch(createBrandStart());
  try {
    const res = await apiRequest.post("/brands", brandData);
    dispatch(createBrandSuccess(res.data.data));
  } catch (error) {
    dispatch(createBrandFailure());
    console.error("Error creating brand:", error);
  }
};

// **Mettre à jour une marque**
export const updateBrand = (id, brandData) => async (dispatch) => {
  dispatch(updateBrandStart());
  try {
    const res = await apiRequest.put(`/brands/${id}`, brandData);
    dispatch(updateBrandSuccess(res.data.data));
  } catch (error) {
    dispatch(updateBrandFailure());
    console.error("Error updating brand:", error);
  }
};

// **Supprimer une marque**
export const deleteBrand = (id) => async (dispatch) => {
  dispatch(deleteBrandStart());
  try {
    await apiRequest.delete(`/brands/${id}`);
    dispatch(deleteBrandSuccess(id));
  } catch (error) {
    dispatch(deleteBrandFailure());
    console.error("Error deleting brand:", error);
  }
};