import { createReducer } from "@reduxjs/toolkit";
import { updateWeather } from "../actions/weatherActions";
import { Weather } from "../../models/weather";

interface WeatherState {
  weather: Weather;
}

const initialState: WeatherState = {
  weather: [],
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateWeather, (state, action) => {
    state.weather = action.payload;
  });
});

export default weatherReducer;
