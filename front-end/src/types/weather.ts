export interface HourlyWeather {
  id: number;
  time: string;
  temperature: {
    value: number;
    units: "C" | "F";
  };
  feels_like: {
    value: number;
    units: "C" | "F";
  };
  humidity: {
    value: number;
    units: "%";
  };
  pressure: {
    value: number;
    units: "hPa"|"inHg";
  };
  uv: number;
  wind_speed: {
    value: number;
    units: "km/h" | "mph";
    direction: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
  };
  condition:
    | "cloudy"
    | "rainy"
    | "snowy"
    | "stormy"
    | "sunny"
    | "windy";
}

export interface IWeather {
  id: number;
  date: string;
  hourly_weather: HourlyWeather[];
  sunrise: string;
  sunset: string;
}

export interface ILocale {
  id: number;
  country: string;
  timezone: string;
}
