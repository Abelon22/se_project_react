import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { ModalWithForm } from "../Modals/ModalWithForm";
import { AddItemModal } from "../Modals/AddItemModal";
import { Footer } from "../Footer/Footer";
import { useModalContext } from "../../context/useModalContext";
import { DeleteModal } from "../Modals/DeleteModal";
import { Profile } from "../Profile/Profile";

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

  // Profile included here because of requirements to submit . The component is at /profile route.

  return (
    <main
      className={`${styles.app} ${isModalOpen ? styles.app_modal_open : ""}`}
    >
      <div className={styles.main__profile_hidden}>
        <Profile />
      </div>
      <Header onAddClick={openModal.bind(null, "add-item")} />
      <Main onCardClick={openItemView} />

      <ModalWithForm
        title="New garment"
        name="add-item"
        buttonText="Add garment"
        isOpen={activeModal === "add-item"}
        onClose={closeModal}
      />

      <AddItemModal
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
