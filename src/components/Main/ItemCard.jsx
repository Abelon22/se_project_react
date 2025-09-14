import styles from "./ItemCard.module.css";

export function ItemCard({ _id, name, weather, imageUrl, onClick }) {
  return (
    <article className={styles.itemCard} onClick={onClick}>
      <img src={imageUrl} alt={name} className={styles.itemCard__image} />
      <div className={styles.itemCard__title} title={name}>
        {name}
      </div>
    </article>
  );
}
