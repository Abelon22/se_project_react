import styles from "./RegistrationModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useState } from "react";
import { useCurrentUser } from "../../context/useCurrentUser";
import { useModalContext } from "../../context/useModalContext";

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

  const handleInputChange = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError[field]) {
      setFormError((prev) => ({ ...prev, [field]: "", general: "" }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url) => {
    if (!url.trim()) return true; // Avatar URL is optional
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const isFormValid = () => {
    return (
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.password.trim() &&
      formData.password.length >= 6 &&
      formData.name.trim() &&
      (!formData.avatar || validateUrl(formData.avatar))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: "",
      password: "",
      name: "",
      avatar: "",
      general: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (formData.avatar && !validateUrl(formData.avatar)) {
      errors.avatar =
        "Please enter a valid URL (must start with http:// or https://)";
    }

    if (errors.email || errors.password || errors.name || errors.avatar) {
      setFormError(errors);
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
      setFormData({ email: "", password: "", name: "", avatar: "" });
      setFormError({
        email: "",
        password: "",
        name: "",
        avatar: "",
        general: "",
      });
      onClose();
    } catch (error) {
      setFormError({
        email: "",
        password: "",
        name: "",
        avatar: "",
        general: error?.message || "Registration failed. Please try again.",
      });
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
    onClose();
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
            />
            {formError.avatar && (
              <p className={styles.modal__error}>{formError.avatar}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.modal__submit}
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          <p className={styles.modal__switch}>
            or{" "}
            <button
              type="button"
              className={styles.modal__switch_button}
              onClick={handleSwitchToLogin}
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
