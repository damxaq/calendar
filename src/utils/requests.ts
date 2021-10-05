export const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
export const ICON_URL = "https://openweathermap.org/img/wn/";

const requests = {
  fetchForecastByCoords: `${OPENWEATHER_BASE_URL}/onecall?`,
  icon: ICON_URL,
};

export default requests;
