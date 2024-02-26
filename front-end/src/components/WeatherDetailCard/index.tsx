import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";
import Card from "@/components/Card";
import { HourlyWeather, IWeather } from "@/types/weather";
import { Icons } from "../Icons/icon";
import { shortenTime } from "@/utils";

interface Weather
  extends Omit<HourlyWeather, "id">,
    Pick<IWeather, "sunrise" | "sunset"> {}

export interface WeatherDetailCardProps
  extends Omit<ComponentProps<typeof Card>, "children"> {
  weather: Weather;
}

const conditions = {
  'rainy': 'Rainy',
  'sunny': 'Sunny',
  'cloudy': 'Cloudy',
  'stormy': 'Stormy',
  'snowy': 'Snowy',
  'windy': 'Windy'
}

const WeatherDetailCard: FC<WeatherDetailCardProps> = ({
  className,
  weather,
  ...props
}) => {
  const timeOfDay =
    weather.time > weather.sunrise && weather.time < weather.sunset ? "day" : "night";
  const WeatherDetailClassName = useClasses({
    classNames: [styles.weatherDetail, className],
  });

  const ConditionIcon = Icons.condition[timeOfDay][weather.condition];
  return (
    <Card {...props} className={WeatherDetailClassName}>
      <div className="grid">
         <div className="temperature">
        <span className="value">
          {weather.temperature.value}°{weather.temperature.units}
        </span>
        <span className="feelsLike">
          Feels like:
          <b>
            {weather.feels_like.value}°{weather.feels_like.units}
          </b>
        </span>
      </div>
      <div className="sun">
        <div className="sunrise">
          <Icons.sun.rise/>
          <div className="time">
            <span>Sunrise</span>
            <span>{shortenTime(weather.sunrise)}</span>
          </div>
        </div>
        <div className="sunset">
          <Icons.sun.set/>
          <div className="time">
            <span>Sunset</span>
            <span>{shortenTime(weather.sunset)}</span>
          </div>
        </div>
      </div>
      <div className="condition">
        <ConditionIcon />
        <span>{conditions[weather.condition]}</span>
      </div>
      <div className="measurements humidity">
        <Icons.measurements.humidity/>
        <span>Humidity</span>
        <span>
          {weather.humidity.value}
          {weather.humidity.units}
        </span>
      </div>
      <div className="measurements pressure">
        <Icons.measurements.pressure/>
        <span>Pressure</span>
        <span>
          {weather.pressure.value}
          {weather.pressure.units}
        </span>
      </div>
      <div className="measurements wind">
        <Icons.measurements.wind/>
        <span>Wind</span>
        <span>
          {weather.wind_speed.value}
          {weather.wind_speed.units} {weather.wind_speed.direction}
        </span>
      </div>
      <div className="measurements uv">
        <Icons.measurements.uv/>
        <span>UV</span>
        <span>{weather.uv}</span>

      </div>
      </div>

    </Card>
  );
};

export default WeatherDetailCard;
