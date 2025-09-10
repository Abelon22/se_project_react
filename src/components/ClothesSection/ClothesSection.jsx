import React from "react";
import styles from "./ClothesSection.module.css";

export function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <section className={styles.clothesSection}>
      <h2 className={styles.clothesSection__title}>Your Items</h2>
      <div className={styles.clothesSection__items}>
        {clothingItems && clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <div
              key={item._id}
              className={styles.clothesSection__item}
              onClick={() => onCardClick(item)}
            >
              <img
                src={item.link || item.imageUrl}
                alt={item.name}
                className={styles.clothesSection__image}
              />
              <p className={styles.clothesSection__name}>{item.name}</p>
            </div>
          ))
        ) : (
          <p className={styles.clothesSection__empty}>No items found</p>
        )}
      </div>
    </section>
  );
}

export default ClothesSection;
