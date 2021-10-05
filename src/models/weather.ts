export type Weather = Array<DailyWeather>;

export type DailyWeather = {
  date: string;
  description: string;
  icon: string;
  main: string;
  temp: number;
};

export type Coords = {
  lat: number;
  lon: number;
};
