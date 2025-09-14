import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],       
    totalCartPrice: 0,   
    totalPriceAfterDiscount: 0, 
    user: null,         
    loading: false,
    error: null
  },
  reducers: {
    cartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    cartRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
        setCart: (state, action) => {
      console.log("Setting cartv2:", action.payload);
      state.cartItems = action.payload.cartItems || [];
      state.totalCartPrice = action.payload.totalCartPrice || 0;
      state.totalPriceAfterDiscount = action.payload.totalPriceAfterDiscount || 0;
      state.user = action.payload.user;
      state.loading = false;
      console.log("State après mise à jour:", state);

    },
    
    addOrUpdateProduct: (state, action) => {
      const { productId, color, price, quantity = 1 } = action.payload;
      
      const existingIndex = state.cartItems.findIndex(
        item => item.product.toString() === productId.toString() && item.color === color
      );
      
      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += quantity;
      } else {
        state.cartItems.push({
          product: productId,
          color,
          price,
          quantity,
          _id: `${productId}-${color}` 
        });
      }
      
      state.totalCartPrice = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 0
      );
      state.loading = false;
    },
    
    // Remove product from cart
    removeProduct: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== itemId);
            state.totalCartPrice = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 0
      );
      state.totalPriceAfterDiscount = 0; 
      state.loading = false;
    },
    
    // Update product quantity
    updateProductQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item._id === itemId);
      
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = quantity;
                state.totalCartPrice = state.cartItems.reduce(
          (total, item) => total + (item.price * item.quantity), 0
        );
        state.totalPriceAfterDiscount = 0; 
      }
      state.loading = false;
    },
    
    // Apply coupon discount
    applyCoupon: (state, action) => {
      const discount = action.payload;
      state.totalPriceAfterDiscount = (
        state.totalCartPrice - (state.totalCartPrice * discount / 100)
      ).toFixed(2);
      state.loading = false;
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
      state.totalCartPrice = 0;
      state.totalPriceAfterDiscount = 0;
      state.loading = false;
    }
  }
});

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) => state.cart.totalCartPrice;
export const selectDiscountedTotal = (state) => state.cart.totalPriceAfterDiscount || state.cart.totalCartPrice;
export const selectCartItemCount = (state) => {
  return state.cart.cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
};

export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

// Export actions
export const { 
  cartRequestStart,
  cartRequestFailed,
  setCart,
  addOrUpdateProduct,
  removeProduct,
  updateProductQuantity,
  applyCoupon,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;