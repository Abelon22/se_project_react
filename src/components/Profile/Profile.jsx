import styles from "./Profile.module.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SideBar } from "../SideBar/SideBar";
import { AddItemModal } from "../Modals/AddItemModal";
import { ItemModal } from "../Modals/ItemModal";
import { DeleteModal } from "../Modals/DeleteModal";
import { useModalContext } from "../../context/useModalContext";

export function Profile() {
  const {
    activeModal,
    selectedCard,
    openModal,
    closeModal,
    closeCardModal,
    openItemView,
    isModalOpen,
  } = useModalContext();

  const openAddClothes = () => openModal("add-item");
  return (
    <div
      className={`${styles.profile} ${
        isModalOpen ? styles.profile__is_modal_open : ""
      }`}
    >
      <div className={styles.profile__headerWrap}>
        <Header onAddClick={openAddClothes} />
      </div>
      <div className={styles.profile__container}>
        <SideBar
          userName={"Octavio de Oro"}
          avatar={"./src/assets/images/Avatar.svg"}
        />
        <div className={styles.profile__main}>
          <ClothesSection
            onCardClick={openItemView}
            onAddClick={openAddClothes}
          />
        </div>
      </div>
      <div className={styles.profile__footerWrap}>
        <Footer />
      </div>
      <AddItemModal
        title="New garment"
        name="add-item"
        buttonText="Add garment"
        isOpen={activeModal === "add-item"}
        onClose={closeModal}
      />
      <ItemModal
        isOpen={activeModal === "item-view"}
        onClose={closeCardModal}
        card={selectedCard}
      />
      <DeleteModal
        isOpen={activeModal === "delete"}
        selectedCard={selectedCard}
        onClose={closeModal}
      />
    </div>
  );
}
