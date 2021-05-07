import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from './actionTypes';

export const updateProducts = (products) =>({
  type: UPDATE_PRODUCTS,
  payload: {
    products
  }
});

export const updateCategories = (categories) =>({
  type: UPDATE_CATEGORIES,
  payload: {
    categories
  }
});

export const updateCurrentCategory = (category) =>({
  type: UPDATE_CURRENT_CATEGORY,
  payload: {
    category
  }
});

export const addToCart = (product) =>({
  type: ADD_TO_CART,
  payload: {
    product
  }
});

export const addMultipleToCart = (products) =>({
  type: ADD_MULTIPLE_TO_CART,
  payload: {
    products
  }
});

export const removeFromCart = (_id) =>({
  type: REMOVE_FROM_CART,
  payload: {
    _id
  }
});

export const updateCartQuantity = (_id, purchaseQuantity) =>({
  type: UPDATE_CART_QUANTITY,
  payload: {
    _id,
    purchaseQuantity
  }
});

export const clearCart = () =>({
  type: CLEAR_CART
});

export const toggleCart = () =>({
  type: TOGGLE_CART
});