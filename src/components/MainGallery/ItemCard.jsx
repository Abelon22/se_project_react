import styles from "./ItemCard.module.css";
import likedIcon from "../../assets/images/liked.svg";
import dislikedIcon from "../../assets/images/disliked.svg";
import { useCurrentUser } from "../../context/useCurrentUser";
import { useClothingItems } from "../../context/useClothingItems";

export function ItemCard({ _id, name, imageUrl, likes = [], onClick }) {
  const { currentUser, isLoggedIn } = useCurrentUser();
  const { likeClothingItem, dislikeClothingItem } = useClothingItems();

  const isLiked = currentUser?._id && likes.includes(currentUser._id);

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // Prevent card click from firing

    if (!isLoggedIn || !currentUser?._id) return;

    try {
      if (isLiked) {
        await dislikeClothingItem(_id);
      } else {
        await likeClothingItem(_id);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <article className={styles.itemCard} onClick={onClick}>
      <img src={imageUrl} alt={name} className={styles.itemCard__image} />
      <div className={styles.itemCard__title} title={name}>
        {name}
      </div>
      {isLoggedIn && (
        <button
          className={styles.itemCard__likeButton}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Unlike item" : "Like item"}
          type="button"
        >
          <img
            src={isLiked ? likedIcon : dislikedIcon}
            alt={isLiked ? "Liked" : "Not liked"}
            className={styles.itemCard__likeIcon}
          />
        </button>
      )}
    </article>
  );
}
