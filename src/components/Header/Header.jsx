import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/Avatar.svg";
import styles from "./Header.module.css";
import ToggleSwitch from "../Toggle/ToggleSwitch";
import { useMemo, useState } from "react";
import { useWeatherContext } from "../../context/useWeatherApiContext";
import { LocationChoice } from "../LocationChoice/LocationChoice";

export function Header({ onAddClick }) {
  const dateToday = useMemo(() => {
    return new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
  }, []);

  const { city } = useWeatherContext();

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <img src={Logo} alt="logo" className={styles.header__logo} />
          <p className={styles.header__date}>
            {dateToday}, {city}
          </p>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
          aria-controls="site-nav"
          aria-expanded={isMobileMenuOpened}
          className={styles.header__menuBtn}
          onClick={toggleMobileMenu}
        >
          {!isMobileMenuOpened ? (
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"></path>
            </svg>
          ) : (
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z"></path>
            </svg>
          )}
        </button>

        <nav
          id="site-nav"
          className={`${styles.header__right} ${
            isMobileMenuOpened ? styles.header__right_open : ""
          }`}
        >
          <div className={styles.header__controls}>
            <span className={styles.header__controls_label}>
              Choose your location
            </span>
            <div className={styles.header__location}>
              <LocationChoice />
            </div>
            <ToggleSwitch className={styles.header__toggle} />
          </div>

          <button
            type="button"
            onClick={onAddClick}
            className={styles.header__button_add}
          >
            +Add clothes
          </button>

          <div className={styles.header__user}>
            <p className={styles.header__user_name}>Octavio de Oro</p>
            <img src={Avatar} alt="avatar" className={styles.header__avatar} />
          </div>
        </nav>
      </div>

      {isMobileMenuOpened && (
        <button
          type="button"
          className={styles.header__overlay}
          aria-label="Close menu"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  );
}
