import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    searchParams: searchSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
