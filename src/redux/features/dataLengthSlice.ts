import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDataLengthState = {
  dataLength: 0,
};

export const dataLengthSlice = createSlice({
  name: 'dataLength',
  initialState: initialDataLengthState,
  reducers: {
    setLengthValue: (state, action: PayloadAction<number>) => {
      state.dataLength = action.payload;
    },
  },
});

export const { setLengthValue } = dataLengthSlice.actions;
export default dataLengthSlice.reducer;
