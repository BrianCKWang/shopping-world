// import { createSlice } from '@reduxjs/toolkit';
import {
  UPDATE_PRODUCTS,
} from '../../actionTypes';

const initialState = {
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      // const { products } = action.payload;
      return {
        ...state,
        products: [...action.payload.products],
      };
    default:
      return state;
  }
}

// export const productSlice = createSlice({
//   name: 'product',
//   initialState,

//   reducers: {
//     // UPDATE_CATEGORIES,
//     update_product: (state, action)=> {
//       state.products = [...action.products];
//     },
//   },
// });

// export const { update_product } = productSlice.actions;

// export default productSlice.reducers;