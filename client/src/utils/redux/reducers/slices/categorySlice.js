import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  currentCategory: '',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,

  reducers: {
    // UPDATE_CATEGORIES,
    update_categories: (state, action)=> {
      state.categories = [...action.payload]
    },

    // UPDATE_CURRENT_CATEGORY,
    update_current_category: (state, action)=> {
      state.currentCategory = action.payload
    }
  },
});

export const { update_categories, update_current_category } = counterSlice.actions;

export default categorySlice.reducers;