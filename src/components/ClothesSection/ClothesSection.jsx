import styles from "./ClothesSection.module.css";
import { ItemCard } from "../Main/ItemCard";
import { useClothingItems } from "../../context/useClothingItems";
import { useWeatherContext } from "../../context/useWeatherApiContext";
import { useTempContext } from "../../context/useTempContext";

export function ClothesSection({ onCardClick }) {
  const { clothingItems } = useClothingItems();
  const { weather, getTemperatureFromUnit } = useWeatherContext();
  const { currentTemperatureUnit } = useTempContext();

  const tempToDisplay = getTemperatureFromUnit(currentTemperatureUnit);

  const itemsToDisplay = clothingItems.filter(
    (item) => item.weather === weather
  );

  return (
    <section className={styles.clothesSection}>
      <div className={styles.clothesSection__header}>
        <h2 className={styles.clothesSection__title}>Your Items</h2>
        <button className={styles.clothesSection__addBtn} type="button">
          + Add new
        </button>
      </div>
      <div className={styles.clothesSection__items}>
        {itemsToDisplay && itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((item) => (
            <ItemCard
              key={item._id}
              {...item}
              onClick={() => onCardClick(item)}
            />
          ))
        ) : (
          <p className={styles.clothesSection__empty}>No items found</p>
        )}
      </div>
    </section>
  );
}

export default ClothesSection;
