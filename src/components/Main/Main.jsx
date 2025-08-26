import { WeatherCard } from "./Weathercard";
import { ItemCard } from "./ItemCard";
import styles from "./Main.module.css";

export function Main({ clothingItems, onCardClick }) {
  return (
    <main className={styles.main}>
      <WeatherCard />

      <section className={styles.main__section}>
        <p className={styles.main__heading}>
          <strong>Today is 75F / You may want to wear:</strong>
        </p>

        <div className={styles.main__items}>
          {clothingItems.map((card) => (
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
