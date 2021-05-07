// import { createSlice } from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from '../../actionTypes';

const initialState = {
  cart: [],
  cartOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // const { product } = action.payload;
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.payload.product]
      };
    }
    case ADD_MULTIPLE_TO_CART:
      // const { products } = action.payload;
      return {
        ...state,
        cart: [...state.cart, ...action.payload.products],
      };
    case REMOVE_FROM_CART:
      // const { _id } = action.payload;
      let newState = state.cart.filter(product => {
        return product._id !== action.payload._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
    case UPDATE_CART_QUANTITY:
      // const { _id, purchaseQuantity } = action.payload;
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action.payload._id === product._id) {
            product.purchaseQuantity = action.payload.purchaseQuantity;
          }
          return product;
        })
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
    default:
      return state;
  }
}


// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,

//   reducers: {
//     // ADD_TO_CART,
//     add_to_cart: (state, action)=> {
//       state.cartOpen = true;
//       state.cart = [...state.cart, action.product]
//     },
//     // ADD_MULTIPLE_TO_CART,
//     add_multiple_to_cart: (state, action)=> {
//       state.cartOpen = true;
//       state.cart = [...state.cart, ...action.products]
//     },
//     // REMOVE_FROM_CART,
//     remove_from_cart: (state, action)=> {
//       state.cartOpen = true;
//       state.cart = [...state.cart, ...action.products]
//     },
//     // UPDATE_CART_QUANTITY,
//     update_cart_quantity: (state, action)=> {
//       state.cartOpen = true;
//       state.cart = [...state.cart, ...action.products]
//     },
//     // CLEAR_CART,
//     clear_cart: (state)=> {
//       state.cartOpen = false;
//       state.cart = []
//     },
//     // TOGGLE_CART
//     toggle_cart: (state)=> {
//       state.cartOpen = !state.cartOpen;
//     },
//   },
// });

// export const {
//   add_to_cart,
//   add_multiple_to_cart,
//   remove_from_cart,
//   update_cart_quantity,
//   clear_cart,
//   toggle_cart
// } = cartSlice.actions;

// export default cartSlice.reducers;