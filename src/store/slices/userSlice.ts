import { createSlice } from '@reduxjs/toolkit';
import { BookProps } from '../../Types';

interface SavedBookProps extends BookProps {
  createdAt: number;
}

interface UserState {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  savedBooks: SavedBookProps[] | null;
  isLoading: boolean;
}

const initialState: UserState = {
  uid: '',
  displayName: null,
  email: null,
  photoURL: null,
  savedBooks: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
    },
    clearUser: (state) => {
      state.uid = '';
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.savedBooks = null;
    },
    setBooks: (state, action) => {
      state.savedBooks = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action) => {
      state.displayName = action.payload;
      state.photoURL = action.payload;
    },
  },
});

export const { clearUser, setUser, setBooks, setLoading, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
