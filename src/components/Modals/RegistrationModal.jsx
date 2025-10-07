import styles from "./RegistrationModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useState, useMemo } from "react";
import { useCurrentUser } from "../../context/useCurrentUser";
import { useModalContext } from "../../context/useModalContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validateForm } from "../../utils/formHelpers";

export function RegistrationModal({ isOpen, onClose }) {
  const { handleRegistration } = useCurrentUser();
  const { openLoginModal } = useModalContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { runFullValidation, validateField } = useFormValidation(
    "registration",
    formData,
    formError
  );

  const formValid = useMemo(
    () => validateForm("registration", formData).isValid,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Full validation pass
    const { errors, isValid } = runFullValidation();
    if (!isValid) {
      setFormError((prev) => ({ ...prev, ...errors, general: "" }));
      return;
    }

    setIsLoading(true);
    try {
      await handleRegistration(
        formData.name,
        formData.avatar,
        formData.email,
        formData.password
      );
      // reset on success
      setFormData({ email: "", password: "", name: "", avatar: "" });
      setFormError({
        email: "",
        password: "",
        name: "",
        avatar: "",
        general: "",
      });
      onClose?.();
    } catch (error) {
      setFormError((prev) => ({
        ...prev,
        general: error?.message || "Registration failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: "", password: "", name: "", avatar: "" });
    setFormError({
      email: "",
      password: "",
      name: "",
      avatar: "",
      general: "",
    });
    setIsLoading(false);
    onClose?.();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSwitchToLogin = () => {
    handleClose();
    openLoginModal();
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

        <h2 className={styles.modal__title}>Sign up</h2>

        <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
          {formError.general && (
            <p className={styles.modal__error_general}>{formError.general}</p>
          )}

          <div className={styles.modal__field}>
            <label htmlFor="register-email" className={styles.modal__label}>
              Email
            </label>
            <input
              type="email"
              id="register-email"
              name="email"
              className={styles.modal__input}
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formError.email && (
              <p className={styles.modal__error}>{formError.email}</p>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="register-password" className={styles.modal__label}>
              Password
            </label>
            <input
              type="password"
              id="register-password"
              name="password"
              className={styles.modal__input}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formError.password && (
              <p className={styles.modal__error}>{formError.password}</p>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="register-name" className={styles.modal__label}>
              Name
            </label>
            <input
              type="text"
              id="register-name"
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
            <label htmlFor="register-avatar" className={styles.modal__label}>
              Avatar URL
            </label>
            <input
              type="url"
              id="register-avatar"
              name="avatar"
              className={styles.modal__input}
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formError.avatar && (
              <p className={styles.modal__error}>{formError.avatar}</p>
            )}
          </div>

          <div className={styles.modal__actions}>
            <button
              type="submit"
              className={styles.modal__submit}
              disabled={isLoading || !formValid}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
            <button
              type="button"
              className={styles.modal__switch_button}
              onClick={handleSwitchToLogin}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
