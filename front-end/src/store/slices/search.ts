import { ILocale } from '@/types/weather';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISearch {
  selectedLocale: ILocale | null;
}

const initialState: ISearch = {
  selectedLocale: null,
};

const weatherSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    setSelectedLocale: (state, action: PayloadAction<ILocale>) => {
      state.selectedLocale = action.payload;
    }
  },
});

export const { setSelectedLocale } = weatherSlice.actions;

export default weatherSlice.reducer;
