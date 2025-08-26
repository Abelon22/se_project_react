import weatherImage from "../../assets/images/cloudDay.png";
import styles from "./WeatherCard.module.css";

export function WeatherCard() {
  return (
    <section className={styles.weatherCard}>
      <div className={styles.weatherCard__container}>
        <img
          src={weatherImage}
          alt="weather"
          className={styles.weatherCard__image}
        />
      </div>
    </section>
  );
}
