import { configureStore } from '@reduxjs/toolkit';
import formSlice from './features/formSlice';

export const store = configureStore({
  reducer: {
    formData: formSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
