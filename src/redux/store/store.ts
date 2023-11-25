import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/searchSlice';
import errorSlice from '../features/errorSlice';
import { beerApi } from '../api/beerApi';
import dataLengthSlice from '../features/dataLengthSlice';
import isLoadingSlice from '../features/isLoading';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: {
      searchParams: searchSlice,
      error: errorSlice,
      dataLength: dataLengthSlice,
      isLoading: isLoadingSlice,
      [beerApi.reducerPath]: beerApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
