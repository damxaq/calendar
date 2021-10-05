import { createAction } from "@reduxjs/toolkit";
import { Weather } from "../../models/weather";

export const updateWeather = createAction<Weather>("updateWeather");
