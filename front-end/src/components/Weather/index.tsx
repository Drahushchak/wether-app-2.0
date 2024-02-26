import useClasses from "@/hooks/useClasses";
import { ComponentProps, FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import WeatherHourlyCard from "@/components/WeatherHourlyCard";
import { IWeather } from "@/types/weather";
import lodash from "lodash";
import { Navigation } from "swiper/modules";
import WeatherDetailCard from "@/components/WeatherDetailCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWeather } from "@/store/slices/weather";
import { getDateRepresentation } from "@/utils";

export interface WeatherProps extends ComponentProps<"div"> {
  cardsClassName?: string;
  weather: IWeather[];
}

const Weather: FC<WeatherProps> = ({ className, cardsClassName, weather, ...props }) => {

  const weatherClassName = useClasses({
    classNames: [styles.weather, className],
  });
  const weatherCardsClassName = useClasses({
    classNames: ["sizedCards", cardsClassName],
  });

  const dispatch = useAppDispatch();

  const getInitialSelectedWeather = () => {
    const firstDay = weather[0];
    const hour = firstDay.hourly_weather.find((hour) => hour.time === "12:00");
    if (!hour) {
      dispatch(setWeather(weather[0].hourly_weather[0]));
      return;
    }
    dispatch(setWeather(hour));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getInitialSelectedWeather, []);

  const selectedWeather = useAppSelector(
    (state) => state.weather.selectedWeather
  );

  const getHourlyWeatherById = (id: number) => {
    return weather
      .map((day) => day.hourly_weather.find((hour) => hour.id === id))
      .find((hour) => hour !== undefined);
  };

  const handleHourlyWeatherChange: ComponentProps<
    typeof WeatherHourlyCard
  >["onChange"] = (event) => {
    const hourlyWeather = getHourlyWeatherById(+event.target.value);
    if (!hourlyWeather) return;
    dispatch(setWeather(hourlyWeather));
  };
  if (!selectedWeather) return null;
  return (
    <div {...props} className={weatherClassName}>
      <Swiper
        centeredSlides={true}
        spaceBetween={50}
        slidesPerView={1}
        cssMode
        navigation
        modules={[Navigation]}
      >
        {weather.map((day) => (
          <SwiperSlide className="weatherSlide" key={day.id}>
            <h2 className="title">Weather for {getDateRepresentation(day.date)}</h2>
            <div className="weatherCardContainer">
              <WeatherDetailCard
                className={weatherCardsClassName}
                weather={{ ...selectedWeather, ...day }}
              />
              <WeatherHourlyCard
                className={weatherCardsClassName}
                hourly_weather={day.hourly_weather}
                {...lodash.pick(day, ["sunrise", "sunset"])}
                onChange={handleHourlyWeatherChange}
                value={selectedWeather?.id}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Weather;
