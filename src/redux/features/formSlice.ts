import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormModel, FormPrintModel } from '../../model/formModel';

let ID_SUBMIT = 1;

const initialFormState: FormPrintModel[] = [];

export const formSlice = createSlice({
  name: 'formData',
  initialState: initialFormState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormModel>) => {
      state.push({
        submitId: ID_SUBMIT++,
        submitDate: new Date().toString(),
        ...action.payload,
      });
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
