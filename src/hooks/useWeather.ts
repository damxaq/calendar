import { useState, useEffect } from "react";
import { Weather } from "../models/weather";
import { fetchWeatherByCoords } from "./../utils/weather.api";
import { useDispatch } from "react-redux";
import { updateWeather } from "../store/actions/weatherActions";
import { Coords } from "../models/weather";

const useWeather = () => {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState<Array<Weather>>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState<Coords>();

  // In case if user does not share their location, then use Poznan coordinates for fetching weather
  const defaultLocation = {
    lat: 52.4069,
    lon: 16.9299,
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        if (coords) {
          const data = await fetchWeatherByCoords(coords);
          if (data) {
            setWeatherData(data);
            dispatch(updateWeather(data));
          }
        }
      } catch (e: any) {
        setWeatherData([]);
        setError(e);
      }
      setIsLoading(false);
    };

    fetchWeather();
  }, [coords]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
      if (!coords) {
        setCoords(defaultLocation);
      }
    }
  }, []);

  return { weatherData, error, isLoading };
};

export default useWeather;
