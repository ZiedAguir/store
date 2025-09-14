import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    FLUSH, } from 'redux-persist';
import {thunk} from 'redux-thunk';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice'; 
import cartReducerV2 from './slices/cartSliceV2'; 

import basketReducer from "./slices/basketSlice"; 
import categoriesReducer from "./slices/categoriesSlice"; 
import subCategoriesReducer from './slices/subCategoriesSlice'; 
import brandReducer from './slices/brandSlice';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  cartV2: cartReducerV2,
  basket: basketReducer,
  categories: categoriesReducer,
  subCategories: subCategoriesReducer, 
  brands: brandReducer,
 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },}).concat(thunk),
  });

export const persistor = persistStore(store);
