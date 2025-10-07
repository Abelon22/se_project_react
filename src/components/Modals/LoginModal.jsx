import styles from "./LoginModal.module.css";
import closeIcon from "../../assets/images/close.svg";
import { useState, useMemo } from "react";
import { useCurrentUser } from "../../context/useCurrentUser";
import { useModalContext } from "../../context/useModalContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validateForm } from "../../utils/formHelpers";

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

  // Wire into shared "login" rules
  const { runFullValidation, validateField } = useFormValidation(
    "login",
    formData,
    formError
  );

  // Live validity for submit button
  const formValid = useMemo(
    () => validateForm("login", formData).isValid,
    [formData]
  );

  const handleInputChange = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-level error as user types
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
      await login(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      setFormError({ email: "", password: "", general: "" });
      onClose?.();
    } catch (error) {
      // Keep your existing general auth UX
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
    onClose?.();
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
              onBlur={handleBlur}
            />
            {formError.email && (
              <p className={styles.modal__error}>{formError.email}</p>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="login-password" className={styles.modal__label}>
              {formError.general ? "Incorrect Password" : "Password"}
            </label>
            <input
              type="password"
              id="login-password"
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
            {formError.general && (
              <p className={styles.modal__error_auth}>
                Email or password incorrect
              </p>
            )}
          </div>

          <div className={styles.modal__actions}>
            <button
              type="submit"
              className={styles.modal__submit}
              disabled={isLoading || !formValid}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
            <button
              type="button"
              className={styles.modal__switch_button}
              onClick={handleSwitchToSignup}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
