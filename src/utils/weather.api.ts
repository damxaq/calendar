import requests from "./requests";
import axios from "axios";
import { Coords } from "../models/weather";

const { REACT_APP_WEATHER_API_KEY } = process.env;

export const fetchWeatherByCoords = async ({ lat, lon }: Coords) => {
  var config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: {
      lat,
      lon,
      cnt: 16,
      units: "metric",
      exclude: "minutely,hourly,current",
      appid: REACT_APP_WEATHER_API_KEY,
    },
  };

  return axios
    .get(requests.fetchForecastByCoords, config)
    .then((response) => {
      const data: any = response.data;
      const weatherData = data.daily.map((elem: any) => {
        return {
          date: new Date(elem.dt * 1000).toLocaleDateString(),
          description: elem.weather[0].description,
          icon: getWeatherIcon(elem.weather[0].icon),
          main: elem.weather[0].main,
          temp: Math.round(elem.temp.day),
        };
      });
      return weatherData;
    })
    .catch((err) => {
      console.log("Error fetching weather", err);
      return [];
    });
};

const getWeatherIcon = (icon: string) => {
  return requests.icon + icon + "@2x.png";
};
