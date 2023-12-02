import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormModel } from '../../model/formModel';

const initialFormState: FormModel[] = [];

export const formSlice = createSlice({
  name: 'formData',
  initialState: initialFormState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormModel>) => {
      state.push(action.payload);
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
