import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { ModalWithForm } from "../Modals/ModalWithForm";
import { ItemModal } from "../Modals/ItemModal";
import { useState } from "react";
import { Footer } from "../Footer/Footer";

function App() {
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

  const isModalOpen = activeModal !== "";

  return (
    <main
      className={`${styles.app} ${isModalOpen ? styles.app_modal_open : ""}`}
    >
      <Header onAddClick={openAddClothes} />
      <Main onCardClick={openItemView} />

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

      <div className={styles.app_footer}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
