import { createSlice } from '@reduxjs/toolkit';

const initialErrorState = {
  hasError: false,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
  reducers: {
    setHasError: (state) => {
      state.hasError = !state.hasError;
    },
  },
});

export const { setHasError } = errorSlice.actions;
export default errorSlice.reducer;
