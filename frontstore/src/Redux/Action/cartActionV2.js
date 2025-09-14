import {
  cartRequestStart,
  cartRequestFailed,
  setCart,
  addOrUpdateProduct,
  removeProduct,
  updateProductQuantity,
  applyCoupon,
  clearCart
} from "../slices/cartSliceV2.js";
import apiRequest from "../../componnent/axios/axiosInstance.js";

// Cache pour les prix des produits
const productPriceCache = new Map();

const getProductPrice = async (productId) => {
  if (productPriceCache.has(productId)) {
    return productPriceCache.get(productId);
  }

  try {
    const { data } = await apiRequest.get(`/products/${productId}`);
    productPriceCache.set(productId, data.data.price);
    return data.data.price;
  } catch (error) {
    console.error("Failed to fetch product price:", error);
    return 0;
  }
};

// Get user's cart from backend
export const fetchUserCart = () => async (dispatch) => {
  try {
    dispatch(cartRequestStart());
    const { data } = await apiRequest.get("/cart");
    dispatch(setCart(data.data));
  } catch (error) {
    dispatch(cartRequestFailed(error.response?.data?.message || error.message));
    // If no cart exists, initialize empty cart in Redux
    if (error.response?.status === 404) {
      dispatch(setCart({ cartItems: [], totalCartPrice: 0, totalPriceAfterDiscount: 0 }));
    }
  }
};

// Add product to cart with optimistic updates
export const addItemToCart = (productId, color) => async (dispatch) => {
  try {
    dispatch(cartRequestStart());
    
    const price = await getProductPrice(productId);
    
    dispatch(addOrUpdateProduct({ 
      productId, 
      color, 
      price,
      quantity: 1
    }));
    
    // API call avec la structure correcte
    const { data } = await apiRequest.post("/cart", {
      product: productId,
      color,
      quantity: 1,
      price 
    });
    
    dispatch(setCart(data.data));
    return data;
    
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(cartRequestFailed(errorMsg));
    dispatch(fetchUserCart());
    throw error;
  }
};

// Remove item from cart with optimistic updates
export const removeItemFromCart = (itemId) => async (dispatch) => {
  try {
    dispatch(cartRequestStart());
        dispatch(removeProduct(itemId));
        const { data } = await apiRequest.delete(`/cart/${itemId}`);
        dispatch(setCart(data.data));
  } catch (error) {
    dispatch(cartRequestFailed(error.response?.data?.message || error.message));
    dispatch(fetchUserCart());
  }
};

export const updateItemQuantity = (itemId, quantity) => async (dispatch, getState) => {
  try {
    dispatch(cartRequestStart());
    
    const state = getState().cart;
    const item = state.cartItems.find(i => i._id === itemId);
    
    if (!item) {
      throw new Error('Item not found in cart');
    }
    dispatch(updateProductQuantity({ 
      itemId, 
      quantity,
      price: item.price 
    }));
    
    const { data } = await apiRequest.put(`/cart/${itemId}`, { quantity });
    dispatch(setCart(data.data));
    
  } catch (error) {
    dispatch(cartRequestFailed(error.message));
    dispatch(fetchUserCart());
  }
};

// Apply coupon with optimistic updates
export const applyCouponToCart = (couponCode) => async (dispatch) => {
  try {
    dispatch(cartRequestStart());
    dispatch(applyCoupon(10)); 
        const { data } = await apiRequest.put("/cart/applyCoupon", { coupon: couponCode });
        dispatch(setCart(data.data));
  } catch (error) {
    dispatch(cartRequestFailed(error.response?.data?.message || error.message));
    dispatch(fetchUserCart());
  }
};

// Clear cart with optimistic updates
export const clearUserCart = () => async (dispatch) => {
  try {
    dispatch(cartRequestStart());
        dispatch(clearCart());
        await apiRequest.delete("/cart");
  } catch (error) {
    dispatch(cartRequestFailed(error.response?.data?.message || error.message));
    dispatch(fetchUserCart());
  }
};