import { addProduct, clearCart, removeProduct, updateProductQuantity } from "../slices/cartSlice";

export const addItemToCart = (product, quantity) => (dispatch) => {
  dispatch(addProduct({ ...product, quantity }));
};

export const removeItemFromCart = (productId) => (dispatch) => {
  dispatch(removeProduct(productId));
};

export const updateItemQuantity = (productId, quantity) => (dispatch) => {
  dispatch(updateProductQuantity({ productId, quantity }));
};

export const clearCartItems = () => (dispatch) => {
  dispatch(clearCart());
};