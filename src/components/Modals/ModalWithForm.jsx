import styles from "./ModalWithForm.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useState, useMemo } from "react";
import { useClothingItems } from "../../context/useClothingItems";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validateForm } from "../../utils/formHelpers";

export function ModalWithForm({ title, name, buttonText, isOpen, onClose }) {
  const { createClothingItem } = useClothingItems();

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    imageUrl: "",
    weather: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitAction = async (n, w, url) => {
    return createClothingItem(n, w, url);
  };

  const { runFullValidation, validateField } = useFormValidation(
    "add-item",
    formData,
    formError
  );

  const formValid = useMemo(
    () => validateForm("add-item", formData).isValid,
    [formData]
  );

  const handleInputChange = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (formError[field]) {
      setFormError((prev) => ({ ...prev, [field]: "", general: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name: field } = e.target;
    const { error } = validateField(field);
    setFormError((prev) => ({ ...prev, [field]: error || "" }));
  };

  const resetForm = () => {
    setFormData({ name: "", imageUrl: "", weather: "" });
    setFormError({ name: "", imageUrl: "", weather: "", general: "" });
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isValid } = runFullValidation();
    if (!isValid) {
      setFormError((prev) => ({ ...prev, ...errors, general: "" }));
      return;
    }

    setIsLoading(true);
    try {
      await submitAction(formData.name, formData.weather, formData.imageUrl);
      resetForm();
      onClose?.();
    } catch (error) {
      setFormError((prev) => ({
        ...prev,
        name: error?.name || "",
        imageUrl: error?.imageUrl || "",
        weather: error?.weather || "",
        general:
          error?.message ||
          "Failed to save item. Please check your data and try again.",
      }));
    } finally {
      setIsLoading(false);
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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
            disabled={isLoading || !formValid}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
