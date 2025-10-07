import styles from "./Profile.module.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
import { EditProfileModal } from "../Modals/EditProfileModal";
import { useModalContext } from "../../context/useModalContext";

export function Profile() {
  const { openModal, openItemView, activeModal, closeModal } =
    useModalContext();
  const openAddClothes = () => openModal("add-item");

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <SideBar />
        <div className={styles.profile__main}>
          <ClothesSection
            onCardClick={openItemView}
            onAddClick={openAddClothes}
          />
        </div>
      </div>
      <EditProfileModal
        isOpen={activeModal === "edit-profile"}
        onClose={closeModal}
      />
    </div>
  );
}
