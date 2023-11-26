import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Limit, Page_Number_Default } from '../../constants/searchParam';

const initialSearchState = {
  searchValue: '',
  pageNumber: Page_Number_Default,
  limit: Limit[2],
};

export const searchSlice = createSlice({
  name: 'searchParams',
  initialState: initialSearchState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<string>) => {
      state.pageNumber = action.payload;
    },
    setLimit: (state, action: PayloadAction<string>) => {
      state.limit = action.payload;
    },
  },
});

export const { setSearchValue, setPageNumber, setLimit } = searchSlice.actions;
export default searchSlice.reducer;
