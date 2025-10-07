import styles from "./LoginModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useState } from "react";
import { useCurrentUser } from "../../context/useCurrentUser";
import { useModalContext } from "../../context/useModalContext";

export function LoginModal({ isOpen, onClose }) {
  const { login } = useCurrentUser();
  const { openRegistrationModal } = useModalContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = { email: "", password: "", general: "" };

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (errors.email || errors.password) {
      setFormError(errors);
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      setFormError({ email: "", password: "", general: "" });
      onClose();
    } catch (error) {
      setFormError({
        email: "",
        password: "",
        general:
          error?.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: "", password: "" });
    setFormError({ email: "", password: "", general: "" });
    setIsLoading(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSwitchToSignup = () => {
    handleClose();
    openRegistrationModal();
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

        <h2 className={styles.modal__title}>Log in</h2>

        <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
          {formError.general && (
            <p className={styles.modal__error_general}>{formError.general}</p>
          )}

          <div className={styles.modal__field}>
            <label htmlFor="login-email" className={styles.modal__label}>
              Email
            </label>
            <input
              type="email"
              id="login-email"
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
            <label htmlFor="login-password" className={styles.modal__label}>
              Password
            </label>
            <input
              type="password"
              id="login-password"
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

          <button
            type="submit"
            className={styles.modal__submit}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          <p className={styles.modal__switch}>
            or{" "}
            <button
              type="button"
              className={styles.modal__switch_button}
              onClick={handleSwitchToSignup}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
