import { combineReducers } from "@reduxjs/toolkit";
import weather from "./slices/weather";
import user, { userPersistConfig } from "./slices/user";
import { persistReducer } from "redux-persist";
import { weatherApi } from './services/weatherApi';
import search from "./slices/search";

export const reducer = combineReducers({
  weather,
  search,
  user: persistReducer(userPersistConfig, user),
  [weatherApi.reducerPath]: weatherApi.reducer,
});
