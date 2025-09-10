import React from "react";
import styles from "./SideBar.module.css";

export function SideBar({ userName, avatar, onEditProfile, onLogout }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__user}>
        <img
          src={avatar || "/src/assets/images/Avatar.svg"}
          alt="User avatar"
          className={styles.sidebar__avatar}
        />
        <h2 className={styles.sidebar__name}>{userName || "User Name"}</h2>
      </div>

      <div className={styles.sidebar__actions}>
        <button
          type="button"
          className={styles.sidebar__button}
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          type="button"
          className={styles.sidebar__button}
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
