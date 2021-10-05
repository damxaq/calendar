import { useSelector, RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";
import { DailyWeather } from "../../models/weather";
import "./weatherView.css";

interface PropTypes {
  date: string;
}

const WeatherView = ({ date }: PropTypes) => {
  const selectWeatherByDate = createSelector(
    (state: RootStateOrAny) => state.weather.weather,
    (weather) =>
      weather.filter((weather: DailyWeather) => weather.date === date)
  );

  const weather = useSelector(selectWeatherByDate)[0];

  return (
    <>
      {weather && (
        <div className="weather-container">
          <div>
            <div className="temp">Temp {weather.temp} °C</div>
            <div className="desc">{weather.description}</div>
          </div>
          <div className="icon">
            <img src={weather.icon} alt={weather.icon} />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherView;
