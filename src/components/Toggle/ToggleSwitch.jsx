import styles from "./ToggleSwitch.module.css";
import { useTempContext } from "../../context/TempContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleTemperatureUnit } =
    useTempContext();

  return (
    <div className={styles["toggle-switch"]}>
      <input
        className={styles["toggle-switch__checkbox"]}
        id="react-switch-new"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleTemperatureUnit}
      />
      <label
        className={styles["toggle-switch__label"]}
        htmlFor="react-switch-new"
      >
        <span className={styles["toggle-switch__button"]}>
          <span className={styles["toggle-switch__text"]}>
            {currentTemperatureUnit}
          </span>
        </span>
        <span className={styles["toggle-switch__background"]}>
          <span className={styles["toggle-switch__f"]}>F</span>
          <span className={styles["toggle-switch__c"]}>C</span>
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
