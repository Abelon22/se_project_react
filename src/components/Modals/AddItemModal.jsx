import styles from "./AddItemModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useModalContext } from "../../context/useModalContext";
import { useCurrentUser } from "../../context/useCurrentUser";

export function AddItemModal({ isOpen, onClose, card }) {
  const { openDeleteModal } = useModalContext();
  const { currentUser } = useCurrentUser();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    openDeleteModal(card);
  };

  const isOwn = card?.owner === currentUser?._id;

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
          <div className={styles.modal__info}>
            <h2 className={styles.modal__title}>{card.name}</h2>
            <p className={styles.modal__weather}>
              Weather:{" "}
              <span className={styles.modal__weather_value}>
                {card.weather}
              </span>
            </p>
          </div>
          {isOwn && (
            <button
              className={styles.modal__delete}
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
