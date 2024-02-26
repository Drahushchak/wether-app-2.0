import Header from "@/components/Header";
import styles from "./styles.module.scss";
import Background from "@/components/Background";
import LocaleCard from "@/components/LocaleCard";
import lodash from "lodash";
import Weather from "@/components/Weather";
import { useAppSelector } from "@/store/hooks";
import { useGetWeatherByCountryQuery } from "@/store/services/weatherApi";
import { getDateStringForQuery } from "./utils";

function Home() {
  const selectedWeather = useAppSelector(
    (state) => state.weather.selectedWeather
  );
  const condition = selectedWeather?.condition || "sunny";
  const hour = +(selectedWeather?.time?.split(":")[0] || 6);
  const selectedLocale = useAppSelector((state) => state.search.selectedLocale);
  const getQuery = () => {
    if (!selectedLocale) return { country: "", start: "", end: "" };
    return {
      country: selectedLocale.country,
      start: getDateStringForQuery(new Date(), selectedLocale.timezone),
      end: getDateStringForQuery(
        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        selectedLocale.timezone
      ),
    };
  };
  const query = getQuery();
  const { data } = useGetWeatherByCountryQuery(query, {
    skip: !selectedLocale,
  });


  return (
    <div className={styles.home}>
      <Header />
      <Background image={condition} hour={hour}>
        {selectedLocale && data && (
          <div className="content">
            <section className="locale">
              <div className="localeContainer">
                <LocaleCard
                  className="homeCard"
                  {...lodash.omit(selectedLocale, "id")}
                />
                <div className="message">
                  <h2>Weather Forecast</h2>
                  <p>Check the weather for {selectedLocale.country}</p>
                </div>
              </div>
            </section>
            <section className="weather">
              <Weather cardsClassName="homeCard" weather={data} />
            </section>
          </div>
        )}
      </Background>
    </div>
  );
}

export default Home;
