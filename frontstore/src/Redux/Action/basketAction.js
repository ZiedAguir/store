import { moveToCart } from "../slices/basketSlice";
import { addProduct } from "../slices/cartSlice";


export const moveProductToCart = (product) => (dispatch) => {
  dispatch(moveToCart({ uniqueId: product.uniqueId })); 
  dispatch(addProduct({ ...product, quantity: 1 })); 
};