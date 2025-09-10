import React from "react";
import styles from "./Profile.module.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export function Profile({
  clothingItems,
  onCardClick,
  userName,
  avatar,
  onEditProfile,
  onLogout,
}) {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <SideBar
          userName={userName}
          avatar={avatar}
          onEditProfile={onEditProfile}
          onLogout={onLogout}
        />
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
        />
      </div>
    </div>
  );
}

export default Profile;
