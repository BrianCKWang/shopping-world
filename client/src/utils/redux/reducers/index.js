import { combineReducers } from "redux";
import cart from './slices/cartSlice';
import category from './slices/categorySlice';
import product from './slices/productSlice';

export default combineReducers({ cart, category, product });