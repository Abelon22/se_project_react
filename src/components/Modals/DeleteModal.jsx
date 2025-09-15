import { useClothingItems } from "../../context/useClothingItems";
import styles from "./DeleteModal.module.css";

export function DeleteModal({ isOpen, selectedCard, onClose }) {
  const { deleteClothingItem } = useClothingItems();

  if (!isOpen || !selectedCard) return null;

  const handleDelete = async () => {
    try {
      await deleteClothingItem(selectedCard._id);
      onClose();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p className={styles.confirmText}>
          Are you sure you want to delete this &quot;{selectedCard.name}&quot;?
        </p>
        <p className={styles.warningText}>This action is irreversible</p>
        <div className={styles.buttonGroup}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Yes, Delete Item
          </button>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
