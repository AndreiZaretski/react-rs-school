import { configureStore } from '@reduxjs/toolkit';
import errorSlice from '../features/errorSlice';
import { beerApi } from '../api/beerApi';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: {
      error: errorSlice,
      [beerApi.reducerPath]: beerApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
