import { configureStore } from '@reduxjs/toolkit';
import { bookDetailsReducer } from './slices/bookDetailsSlice';
import { categoriesReducer } from './slices/categoriesPageSlice';
import { homePageReducer } from './slices/homePageSlice';

export const store = configureStore({
  reducer: {
    homepage: homePageReducer,
    categories: categoriesReducer,
    details: bookDetailsReducer,
  },
});

export * from './slices/homePageSlice';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
