import styles from "./ToggleSwitch.module.css";
import { useTempContext } from "../../context/useTempContext";

const ToggleSwitch = ({ className = "" }) => {
  const { currentTemperatureUnit, handleToggleTemperatureUnit } =
    useTempContext();

  return (
    <div className={`${styles.toggleSwitch} ${className}`}>
      <input
        className={styles.toggleSwitchCheckbox}
        id="react-switch-new"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleTemperatureUnit}
        role="switch"
        aria-checked={currentTemperatureUnit === "C"}
        aria-label="Toggle temperature unit (Fahrenheit/Celsius)"
      />
      <label className={styles.toggleSwitchLabel} htmlFor="react-switch-new">
        <span className={styles.toggleSwitchButton} />
        <span className={styles.toggleSwitchBackground}>
          <span className={styles.toggleSwitchF}>F</span>
          <span className={styles.toggleSwitchC}>C</span>
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
