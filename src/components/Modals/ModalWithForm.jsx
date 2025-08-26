import { useState } from "react";
import styles from "./ModalWithForm.module.css";
import closeIcon from "../../assets/images/close.svg";

export function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    weather: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.link && formData.weather) {
      onSubmit(formData);
      setFormData({ name: "", link: "", weather: "" });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className={styles.modal__title}>{title}</h2>

        <form className={styles.modal__form} onSubmit={handleSubmit}>
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
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="garment-image" className={styles.modal__label}>
              Image
            </label>
            <input
              type="url"
              id="garment-image"
              name="link"
              className={styles.modal__input}
              placeholder="Image URL"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
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
          </fieldset>

          <button type="submit" className={styles.modal__submit}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
