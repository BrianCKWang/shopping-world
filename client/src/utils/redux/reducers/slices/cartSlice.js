import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // ADD_TO_CART,
    add_to_cart: (state, action)=> {
      state.cartOpen = true;
      state.cart = [...state.cart, action.product]
    },
    // ADD_MULTIPLE_TO_CART,
    add_multiple_to_cart: (state, action)=> {
      state.cartOpen = true;
      state.cart = [...state.cart, ...action.products]
    },
    // REMOVE_FROM_CART,
    remove_from_cart: (state, action)=> {
      state.cartOpen = true;
      state.cart = [...state.cart, ...action.products]
    },
    // UPDATE_CART_QUANTITY,
    update_cart_quantity: (state, action)=> {
      state.cartOpen = true;
      state.cart = [...state.cart, ...action.products]
    },
    // CLEAR_CART,
    clear_cart: (state)=> {
      state.cartOpen = false;
      state.cart = []
    },
    // TOGGLE_CART
    toggle_cart: (state)=> {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const { add_to_cart } = counterSlice.actions;

export default cartSlice.reducers;