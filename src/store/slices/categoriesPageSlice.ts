import { createSlice } from '@reduxjs/toolkit';
import { BookProps } from '../../Types';
import { fetchCategories } from '../thunks/fetchCategories';

const initialState: { books: { [x: string]: BookProps[] }[]; isLoading: boolean } = {
  books: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      const query = action.meta.arg.query;
      if (action.meta.arg.source !== 'categories' || state.books.find((category) => category[query])) return;
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const query = action.meta.arg.query;
      if (action.meta.arg.source !== 'categories' || state.books.find((category) => category[query])) return;

      state.isLoading = false;
      state.books.push({
        [action.meta.arg.query]: action.payload,
      });
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
