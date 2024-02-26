import { ComponentProps, FC, useRef } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";
import Card from "@/components/Card";
import { HourlyWeather, IWeather } from "@/types/weather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icons } from "@/components/Icons/icon";
import { useResizeObserver } from "usehooks-ts";
import 'swiper/css';
import { shortenTime } from "@/utils";
type HourWeather = Pick<
  HourlyWeather,
  "id" | "temperature" | "condition" | "time" | "wind_speed"
>;

export interface HourWeatherCardProps
  extends Omit<ComponentProps<typeof Card>, "children" | "onChange" | "id">,
    Pick<ComponentProps<"input">, "onChange"> {
  weather: HourWeather & Pick<IWeather, "sunrise" | "sunset">;
  value?: number;
}

export interface WeatherSelectHoursProps
  extends Omit<ComponentProps<typeof Card>, "children" | "onChange">,
    Pick<HourWeatherCardProps, "onChange" | "value"> {
  hourly_weather: Omit<HourWeatherCardProps["weather"], "sunrise" | "sunset">[];
  sunrise: string;
  sunset: string;
}

const WeatherHourlyCard: FC<WeatherSelectHoursProps> = ({
  className,
  onChange,
  hourly_weather,
  sunrise,
  sunset,
  value,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width = 710 } = useResizeObserver({ ref });
  const weatherHourlyCardClassName = useClasses({
    classNames: [styles.weatherHourlyCard, className],
  });
  const getSlidesPerView = () => {
    const CARD_SIZE = 130;
    return Math.floor((width - 20) / CARD_SIZE);
  };

  const getInitialSlide = () => {
    return hourly_weather.findIndex((hour) => hour.id === value);
  }


  return (
    <Card {...props} className={weatherHourlyCardClassName} ref={ref}>
        <h2>Hourly Forecast:</h2>
        <Swiper slidesPerView={getSlidesPerView()} initialSlide={getInitialSlide()} >
              {hourly_weather.map((w) => (
                <SwiperSlide key={w.id}>
                    <HourWeatherCard className="containerSize" {...{weather: {...w, sunrise, sunset}, onChange, value}} />
                </SwiperSlide>
              ))}
        </Swiper>
    </Card>
  );
};

const windDirectionDeg = {
  N: 0,
  NE: 45,
  E: 90,
  SE: 135,
  S: 180,
  SW: 225,
  W: 270,
  NW: 315,
};

const HourWeatherCard: FC<HourWeatherCardProps> = ({ weather, onChange, className, value, ...props }) => {
  const timeOfDay =
    weather.time >= weather.sunrise && weather.time <= weather.sunset ? "day" : "night";

  const hourWeatherClassName = useClasses({classNames: [styles.hourWeather, className]});

  const hourWeatherCardClassName = useClasses({
    classNames: ["hourWeatherCard", timeOfDay],
  });

  const ConditionIcon = Icons.condition[timeOfDay][weather.condition];


  return (
    <label className={hourWeatherClassName} htmlFor={`hour-${weather.id}`}>
      <Card className={hourWeatherCardClassName} {...props}>
        <input type="radio" name="hourlyWeather" id={`hour-${weather.id}`} checked={weather.id==value} value={weather.id} onChange={onChange}/>
        <span>{shortenTime(weather.time)}</span>
        <ConditionIcon
          className="condition"
        />
        <span>
          {weather.temperature.value}°{weather.temperature.units}
        </span>
        <Icons.navigation
          className="windDirection"
          style={{
            transform: `rotate(${windDirectionDeg[weather.wind_speed.direction]}deg)`,
          }}
        />
        <span>
          {weather.wind_speed.value}
          {weather.wind_speed.units}
        </span>
      </Card>
    </label>
  );
};

export { HourWeatherCard };
export default WeatherHourlyCard;
