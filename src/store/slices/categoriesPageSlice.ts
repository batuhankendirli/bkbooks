import { createSlice } from '@reduxjs/toolkit';
import { BookProps } from '../../Types';
import { fetchBooks } from '../thunks/fetchBooks';

const initialState: { books: BookProps[][]; isLoading: boolean } = {
  books: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.isLoading = true;
      state.books = [];
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
