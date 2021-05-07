import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    // UPDATE_CATEGORIES,
    update_product: (state, action)=> {
      state.products = [...action.products];
    },
  },
});

export const { update_product } = counterSlice.actions;

export default productSlice.reducers;