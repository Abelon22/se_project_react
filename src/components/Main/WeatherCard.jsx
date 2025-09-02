import styles from "./WeatherCard.module.css";
import { useWeatherContext } from "../../context/useWeatherApiContext";
import { useTempContext } from "../../context/useTempContext";

export function WeatherCard() {
  const { getWeatherImageUrl, preciseWeather, getTemperatureFromUnit } =
    useWeatherContext();

  const { weatherType, isDayTime } = preciseWeather;

  const { currentTemperatureUnit } = useTempContext();
  const tempToDisplay = getTemperatureFromUnit(currentTemperatureUnit);

  return (
    <section className={styles.weatherCard}>
      <div className={styles.weatherCard__container}>
        <div className={styles.weatherCard__imageContainer}>
          <img
            src={getWeatherImageUrl(weatherType, isDayTime)}
            alt="weather"
            className={styles.weatherCard__image}
          />
          <span className={styles.weatherCard__temperature}>
            {tempToDisplay}
          </span>
        </div>
      </div>
    </section>
  );
}
