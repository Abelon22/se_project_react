import styles from "./SideBar.module.css";
import { useCurrentUser } from "../../context/useCurrentUser";
import { useModalContext } from "../../context/useModalContext";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const { currentUser, logout } = useCurrentUser();
  const { openEditProfileModal } = useModalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__user}>
        <img
          src={currentUser?.avatar || "/src/assets/images/Avatar.svg"}
          alt="User avatar"
          className={styles.sidebar__avatar}
        />
        <h2 className={styles.sidebar__name}>{currentUser?.name || "User"}</h2>
      </div>

      <div className={styles.sidebar__button_container}>
        <button
          type="button"
          onClick={openEditProfileModal}
          className={styles.sidebar__button}
        >
          Change profile data
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className={styles.sidebar__button_logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
