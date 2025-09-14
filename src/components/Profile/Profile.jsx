import styles from "./Profile.module.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SideBar } from "../SideBar/SideBar";
import { useState } from "react";
import { ModalWithForm } from "../Modals/ModalWithForm";
import { ItemModal } from "../Modals/ItemModal";

export function Profile() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const openAddClothes = () => setActiveModal("add-item");

  const openItemView = (card) => {
    setSelectedCard(card);
    setActiveModal("item-view");
  };
  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };
  return (
    <div className={styles.profile}>
      <Header onAddClick={openAddClothes} />
      <div className={styles.profile__container}>
        <SideBar
          userName={"Octavio de Oro"}
          avatar={"/src/assets/images/Avatar.svg"}
        />
        <ClothesSection onCardClick={openItemView} />
      </div>
      <ModalWithForm
        title="New garment"
        name="add-item"
        buttonText="Add garment"
        isOpen={activeModal === "add-item"}
        onClose={handleCloseModal}
      />
      <ItemModal
        isOpen={activeModal === "item-view"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
      <Footer />
    </div>
  );
}
