import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ModalWithForm } from "../Modals/ModalWithForm";
import { AddItemModal } from "../Modals/AddItemModal";
import { DeleteModal } from "../Modals/DeleteModal";
import { LoginModal } from "../Modals/LoginModal";
import { RegistrationModal } from "../Modals/RegistrationModal";
import { useModalContext } from "../../context/useModalContext";

export default function Layout() {
  const { activeModal, selectedCard, openModal, closeModal, closeCardModal } =
    useModalContext();

  const openAddClothes = () => openModal("add-item");

  return (
    <main className={styles.app}>
      <Header onAddClick={openAddClothes} />

      <Outlet />

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
      <LoginModal isOpen={activeModal === "login"} onClose={closeModal} />
      <RegistrationModal
        isOpen={activeModal === "registration"}
        onClose={closeModal}
      />

      <div className={styles.app_footer}>
        <Footer />
      </div>
    </main>
  );
}
