import styles from "./LocationChoice.module.css";
import { useLocationSettings } from "../../context/useLocationContext";

export function LocationChoice() {
  const { mode, setMode } = useLocationSettings();

  const handleToggle = () => {
    setMode(mode === "default" ? "user" : "default");
  };

  return (
    <div className={styles.locationChoice}>
      <span className={styles.locationChoice__label}>Use My Location</span>

      <label
        className={styles.locationChoice__toggle}
        htmlFor="locationToggle"
        aria-label="Use my location"
      >
        <input
          id="locationToggle"
          type="checkbox"
          className={styles.locationChoice__checkbox}
          checked={mode === "user"}
          onChange={handleToggle}
        />
        <span className={styles.locationChoice__track}>
          <span className={styles.locationChoice__thumb} />
        </span>
      </label>
    </div>
  );
}
