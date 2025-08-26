import weatherImage from "../../assets/images/cloudDay.png";
import styles from "./WeatherCard.module.css";

export function WeatherCard() {
  return (
    <section className={styles.weatherCard}>
      <div className={styles.weatherCard__container}>
        <div className={styles.weatherCard__imageContainer}>
          <img
            src={weatherImage}
            alt="weather"
            className={styles.weatherCard__image}
          />
          <span className={styles.weatherCard__temperature}>75 F</span>
        </div>
      </div>
    </section>
  );
}
