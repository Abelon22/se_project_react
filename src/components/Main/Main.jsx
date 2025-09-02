import { WeatherCard } from "./WeatherCard";
import { ItemCard } from "./ItemCard";
import styles from "./Main.module.css";
import { useWeatherContext } from "../../context/useWeatherApiContext";
import { useTempContext } from "../../context/useTempContext";

export function Main({ clothingItems, onCardClick }) {
  const { weather, getTemperatureFromUnit } = useWeatherContext();
  const { currentTemperatureUnit } = useTempContext();

  const tempToDisplay = getTemperatureFromUnit(currentTemperatureUnit);

  const itemsToDisplay = clothingItems.filter(
    (item) => item.weather === weather
  );
  return (
    <main className={styles.main}>
      <WeatherCard />

      <section className={styles.main__section}>
        <p className={styles.main__heading}>
          <strong>Today is {tempToDisplay} / You may want to wear:</strong>
        </p>

        <div className={styles.main__items}>
          {itemsToDisplay.map((card) => (
            <ItemCard
              key={card._id}
              {...card}
              onClick={() => onCardClick(card)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
