import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { ModalWithForm } from "../Modals/ModalWithForm";
import { ItemModal } from "../Modals/ItemModal";
import { Profile } from "../Profile/Profile";
import { AddItemModal } from "../AddItemModal/AddItemModal";
import { useState } from "react";
import { defaultClothingItems } from "../../utils/clothingItems";
import Footer from "../Footer/Footer";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
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

  const handleAddGarment = (item) => {
    const newItem = {
      ...item,
      _id: Date.now(),
    };
    setClothingItems((currentItems) => [newItem, ...currentItems]);
    handleCloseModal();
  };

  const isModalOpen = activeModal !== "";

  return (
    <main
      className={`${styles.app} ${isModalOpen ? styles.app_modal_open : ""}`}
    >
      <Header onAddClick={openAddClothes} />
      <Main clothingItems={clothingItems} onCardClick={openItemView} />
      <Profile
        clothingItems={clothingItems}
        onCardClick={openItemView}
        userName="Octavio de Oro"
        avatar="/src/assets/images/Avatar.svg"
        onEditProfile={() => {}}
        onLogout={() => {}}
      />

      <ModalWithForm
        title="New garment"
        name="add-item"
        buttonText="Add garment"
        isOpen={activeModal === "add-item"}
        onClose={handleCloseModal}
        onSubmit={handleAddGarment}
      />

      <AddItemModal
        isOpen={activeModal === "add-item-modal"}
        onClose={handleCloseModal}
        onSubmit={handleAddGarment}
      />

      <ItemModal
        isOpen={activeModal === "item-view"}
        onClose={handleCloseModal}
        card={selectedCard}
      />

      <div className={styles.app_footer}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
