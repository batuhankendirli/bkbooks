import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../../Types';
import { fetchBooks } from '../thunks/fetchBooks';

const initialState: InitialState = {
  books: [],
  searchTerm: '',
  findBy: 'intitle',
  printType: 'all',
  orderBy: 'relevance',
  isLoading: false,
  error: null,
};

const homePageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    changeFindType: (state, action) => {
      state.books = [];
      state.findBy = action.payload;
    },
    changeSearchTerm: (state, action) => {
      action.payload.length >= 3 ? (state.books = []) : null;
      state.searchTerm = action.payload;
    },
    changePrintType: (state, action) => {
      state.printType = action.payload;
    },
    changeOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    filterResults: (state) => {
      state.books = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { changeFindType, changeSearchTerm, changeOrderBy, changePrintType, filterResults } =
  homePageSlice.actions;
export const homePageReducer = homePageSlice.reducer;
