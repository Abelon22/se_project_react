import { ModalContext } from "./useModalContext";
import { useState } from "react";

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const isModalOpen = activeModal !== "";

  const openModal = (modalName) => setActiveModal(modalName);

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete");
  };

  const closeModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const closeCardModal = () => {
    setActiveModal("");

    setSelectedCard(null);
  };

  const openItemView = (card) => {
    setSelectedCard(card);
    setActiveModal("item-view");
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        setActiveModal,
        selectedCard,
        setSelectedCard,
        openModal,
        closeModal,
        closeCardModal,
        openItemView,
        isModalOpen,
        openDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
