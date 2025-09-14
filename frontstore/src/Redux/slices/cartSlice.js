import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], 
    quantity: 0,  
    total: 0,     
  },
  reducers: {
    // Ajouter un produit au panier
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.products.find((item) => item.uniqueId === newProduct.uniqueId);
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity || 1; 
      } else {
        state.products.push({ ...newProduct, quantity: newProduct.quantity || 1 });
      }
      state.quantity += newProduct.quantity || 1;
      state.total += newProduct.price * (newProduct.quantity || 1);
    },

    // Supprimer un produit du panier
    removeProduct: (state, action) => {
      const productId = action.payload;
      const removedProduct = state.products.find((item) => item.uniqueId === productId);

      if (removedProduct) {
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products = state.products.filter((item) => item.uniqueId !== productId);
      }
    },

    // Mettre à jour la quantité d'un produit dans le panier
    updateProductQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.products.find((item) => item.uniqueId === productId);

      if (productToUpdate) {
        state.quantity += newQuantity - productToUpdate.quantity;
        state.total += productToUpdate.price * (newQuantity - productToUpdate.quantity);
        productToUpdate.quantity = newQuantity;
      }
    },

    // Vider le panier
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

// Export des sélecteurs
export const selectCartItems = (state) => state.cart?.products || [];
export const selectCartTotal = (state) =>
  (state.cart?.products || []).reduce((total, item) => total + item.price * item.quantity, 0);

// Export des actions
export const { addProduct, removeProduct, updateProductQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;