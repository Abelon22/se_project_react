import React from "react";
import styles from "./AddItemModal.module.css";

export function AddItemModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        <button type="button" className={styles.modal__close} onClick={onClose}>
          Close
        </button>
        <h2 className={styles.modal__title}>Add New Item</h2>
        <form className={styles.modal__form} onSubmit={onSubmit}>
          <button type="submit" className={styles.modal__submit}>
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
