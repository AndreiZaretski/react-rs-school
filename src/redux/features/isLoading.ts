import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialLoadingState = {
  isLoading: false,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: initialLoadingState,
  reducers: {
    setLoadingValue: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingValue } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
