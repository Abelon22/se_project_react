import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { ModalWithForm } from "../Modals/ModalWithForm";
import { ItemModal } from "../Modals/ItemModal";
import { Footer } from "../Footer/Footer";
import { useModalContext } from "../../context/useModalContext";
import { DeleteModal } from "../Modals/DeleteModal";
// one change

function App() {
  const {
    activeModal,
    selectedCard,
    openModal,
    closeModal,
    closeCardModal,
    openItemView,
    isModalOpen,
  } = useModalContext();

  return (
    <main
      className={`${styles.app} ${isModalOpen ? styles.app_modal_open : ""}`}
    >
      <Header onAddClick={openModal.bind(null, "add-item")} />
      <Main onCardClick={openItemView} />

      <ModalWithForm
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

      <div className={styles.app_footer}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
