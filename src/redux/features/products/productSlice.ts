import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  yearsRange: number;
  searchTerm: string;
}

const initialState: IProduct = {
  status: false,
  yearsRange: 0,
  searchTerm: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.yearsRange = action.payload;
    },
    searchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { toggleState, setPriceRange, searchTerm } = productSlice.actions;

export default productSlice.reducer;
