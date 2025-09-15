import styles from "./SideBar.module.css";

export function SideBar({ userName, avatar }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__user}>
        <img
          src={avatar || "/src/assets/images/Avatar.svg"}
          alt="User avatar"
          className={styles.sidebar__avatar}
        />
        <h2 className={styles.sidebar__name}>{userName}</h2>
      </div>
    </div>
  );
}
