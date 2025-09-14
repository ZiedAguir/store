import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [], 
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items.push(action.payload);
    },
    emptyBasket: (state) => {
      state.items = [];
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.uniqueId !== action.payload);
    },
    moveToCart: (state, action) => {
      const product = state.items.find((item) => item.uniqueId === action.payload.uniqueId);
      if (product) {
        state.items = state.items.filter((item) => item.uniqueId !== action.payload.uniqueId);
      }
    },
  },
});

export const { addToBasket, emptyBasket, removeFromBasket, moveToCart } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((amount, item) => amount + item.price, 0);

export default basketSlice.reducer;