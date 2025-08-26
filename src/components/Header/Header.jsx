import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/Avatar.svg";
import styles from "./Header.module.css";
import { useMemo } from "react";

export function Header({ onAddClick }) {
  const dateToday = useMemo(() => {
    return new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <img src={Logo} alt="logo" className={styles.header__logo} />
          <p className={styles.header__date}>{dateToday}, West Palm Beach</p>
        </div>

        <div className={styles.header__right}>
          <button
            type="button"
            onClick={onAddClick}
            className={styles.header__button_add}
          >
            Add clothes
          </button>
          <div className={styles.header__user}>
            <p className={styles.header__user_name}>Terrence Tegegne</p>
            <img src={Avatar} alt="avatar" className={styles.header__avatar} />
          </div>
        </div>
      </div>
    </header>
  );
}
