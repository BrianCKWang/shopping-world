// import { createSlice } from '@reduxjs/toolkit';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../actionTypes';

const initialState = {
  categories: [],
  currentCategory: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      // const { categories } = action.payload;
      return {
        ...state,
        categories: [...action.payload.categories]
      };
    case UPDATE_CURRENT_CATEGORY:
      // const { category } = action.payload;
      return {
        ...state,
        currentCategory: action.payload.category
      };
    default:
      return state;
  }
}

// export const categorySlice = createSlice({
//   name: 'category',
//   initialState,

//   reducers: {
//     // UPDATE_CATEGORIES,
//     update_categories: (state, action)=> {
//       state.categories = [...action.payload]
//     },

//     // UPDATE_CURRENT_CATEGORY,
//     update_current_category: (state, action)=> {
//       state.currentCategory = action.payload
//     }
//   },
// });

// export const { update_categories, update_current_category } = categorySlice.actions;

// export default categorySlice.reducers;