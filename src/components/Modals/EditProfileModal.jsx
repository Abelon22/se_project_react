import styles from "./EditProfileModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../../context/useCurrentUser";

export function EditProfileModal({ isOpen, onClose }) {
  const { currentUser, updateUser } = useCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    avatar: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Update form data when currentUser changes or modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleInputChange = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError[field]) {
      setFormError((prev) => ({ ...prev, [field]: "", general: "" }));
    }
  };

  const validateUrl = (url) => {
    if (!url.trim()) return true; // Avatar URL is optional
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = { name: "", avatar: "", general: "" };

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (formData.avatar && !validateUrl(formData.avatar)) {
      errors.avatar =
        "Please enter a valid URL (must start with http:// or https://)";
    }

    if (errors.name || errors.avatar) {
      setFormError(errors);
      return;
    }

    setIsLoading(true);
    try {
      await updateUser(formData.name, formData.avatar);
      setFormError({ name: "", avatar: "", general: "" });
      onClose();
    } catch (error) {
      setFormError({
        name: "",
        avatar: "",
        general:
          error?.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    });
    setFormError({ name: "", avatar: "", general: "" });
    setIsLoading(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.modal_is_opened : ""}`}
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

        <h2 className={styles.modal__title}>Change profile data</h2>

        <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
          {formError.general && (
            <p className={styles.modal__error_general}>{formError.general}</p>
          )}

          <div className={styles.modal__field}>
            <label htmlFor="edit-name" className={styles.modal__label}>
              Name
            </label>
            <input
              type="text"
              id="edit-name"
              name="name"
              className={styles.modal__input}
              placeholder={currentUser?.name || "Name"}
              value={formData.name}
              onChange={handleInputChange}
            />
            {formError.name && (
              <p className={styles.modal__error}>{formError.name}</p>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="edit-avatar" className={styles.modal__label}>
              Avatar
            </label>
            <input
              type="url"
              id="edit-avatar"
              name="avatar"
              className={styles.modal__input}
              placeholder={currentUser?.avatar || "Avatar URL"}
              value={formData.avatar}
              onChange={handleInputChange}
            />
            {formError.avatar && (
              <p className={styles.modal__error}>{formError.avatar}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.modal__submit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
