import styles from "./Profile.module.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
import { useModalContext } from "../../context/useModalContext";

export function Profile() {
  const { openModal, openItemView } = useModalContext();
  const openAddClothes = () => openModal("add-item");

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <SideBar
          userName={"John Overton Bell"}
          avatar={"./src/assets/images/Avatar.svg"}
        />
        <div className={styles.profile__main}>
          <ClothesSection
            onCardClick={openItemView}
            onAddClick={openAddClothes}
          />
        </div>
      </div>
    </div>
  );
}
