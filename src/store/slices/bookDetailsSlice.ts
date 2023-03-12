import { createSlice } from '@reduxjs/toolkit';
import { BookDetailsProps } from '../../Types';
import { fetchBookDetails } from '../thunks/fetchBookDetails';

const initialState: { book: BookDetailsProps[]; isLoading: boolean } = {
  book: [],
  isLoading: false,
};

const bookDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    });
  },
});

export const bookDetailsReducer = bookDetailsSlice.reducer;
