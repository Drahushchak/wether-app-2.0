import { HourlyWeather } from '@/types/weather';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {selectedWeather?: HourlyWeather} = {
  selectedWeather: undefined
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<HourlyWeather>) => {
      state.selectedWeather = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
