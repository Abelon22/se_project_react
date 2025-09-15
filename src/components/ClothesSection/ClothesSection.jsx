import styles from "./ClothesSection.module.css";
import { ItemCard } from "../Main/ItemCard";
import { useClothingItems } from "../../context/useClothingItems";
import { useWeatherContext } from "../../context/useWeatherApiContext";

export function ClothesSection({ onCardClick, onAddClick }) {
  const { weather } = useWeatherContext();
  const { clothingItems } = useClothingItems();

  const itemsToDisplay = clothingItems.filter(
    (item) => item.weather === weather
  );

  return (
    <section className={styles.clothesSection}>
      <div className={styles.clothesSection__header}>
        <h2 className={styles.clothesSection__title}>Your Items</h2>
        <button
          className={styles.clothesSection__addBtn}
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <div className={styles.clothesSection__items}>
        {itemsToDisplay.length > 0 &&
          itemsToDisplay.map((item) => (
            <ItemCard
              key={item._id}
              {...item}
              onClick={() => onCardClick(item)}
            />
          ))}
      </div>
    </section>
  );
}

export default ClothesSection;
