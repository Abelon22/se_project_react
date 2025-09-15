import styles from "./AddItemModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useClothingItems } from "../../context/useClothingItems";
import { useModalForm } from "../../hooks/useModalForm";

export function AddItemModal({ title, name, buttonText, isOpen, onClose }) {
  const {
    formData,
    setFormData,
    setFormError,
    setIsLoading,
    formError,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useModalForm();

  const { createClothingItem } = useClothingItems();

  const handleClose = () => {
    setFormData({ name: "", imageUrl: "", weather: "" });
    setFormError({ name: "", imageUrl: "", weather: "" });
    setIsLoading(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modal} ${styles[`modal_type_${name}`]} ${
        isOpen ? styles.modal_is_opened : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal__container}>
        <button
          className={styles.modal__close}
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className={styles.modal__title}>{title}</h2>

        <form
          className={styles.modal__form}
          onSubmit={(e) => handleSubmit(e, createClothingItem, handleClose)}
          noValidate
        >
          <div className={styles.modal__field}>
            <label htmlFor="garment-name" className={styles.modal__label}>
              Name
            </label>
            <input
              type="text"
              id="garment-name"
              name="name"
              className={styles.modal__input}
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formError.name && (
              <p className={styles.modal__error}>{formError.name}</p>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="garment-image" className={styles.modal__label}>
              Image
            </label>
            <input
              type="url"
              id="garment-image"
              name="imageUrl"
              className={styles.modal__input}
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            {formError.imageUrl && (
              <p className={styles.modal__error}>{formError.imageUrl}</p>
            )}
          </div>

          <fieldset className={styles.modal__radio_fieldset}>
            <legend className={styles.modal__legend}>
              Select the weather type:
            </legend>

            <div className={styles.modal__radio_group}>
              <label className={styles.modal__radio_label}>
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  checked={formData.weather === "hot"}
                  onChange={handleInputChange}
                  className={styles.modal__radio}
                />
                <span className={styles.modal__radio_text}>Hot</span>
              </label>

              <label className={styles.modal__radio_label}>
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  checked={formData.weather === "warm"}
                  onChange={handleInputChange}
                  className={styles.modal__radio}
                />
                <span className={styles.modal__radio_text}>Warm</span>
              </label>

              <label className={styles.modal__radio_label}>
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  checked={formData.weather === "cold"}
                  onChange={handleInputChange}
                  className={styles.modal__radio}
                />
                <span className={styles.modal__radio_text}>Cold</span>
              </label>
            </div>
            {formError.weather && (
              <p className={styles.modal__error}>{formError.weather}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className={styles.modal__submit}
            disabled={isLoading || Object.values(formError).some(Boolean)}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
