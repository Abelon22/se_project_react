import styles from "./ItemModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useModalContext } from "../../context/useModalContext";

export function ItemModal({ isOpen, onClose, card }) {
  const { openDeleteModal } = useModalContext();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    openDeleteModal(card);
  };

  if (!isOpen || !card) return null;

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.modal_is_opened : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal__container}>
        <button
          className={styles.modal__close}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className={styles.modal__image}
        />

        <div className={styles.modal__content}>
          <h2 className={styles.modal__title}>{card.name}</h2>
          <p className={styles.modal__weather}>
            Weather:{" "}
            <span className={styles.modal__weather_value}>{card.weather}</span>
          </p>
          <button className={styles.modal__delete} onClick={handleDeleteClick}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}
