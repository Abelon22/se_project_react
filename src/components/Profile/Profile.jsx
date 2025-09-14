import styles from "./Profile.module.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SideBar } from "../SideBar/SideBar";
import { useState } from "react";

export function Profile({
  onCardClick,
  userName,
  avatar,
  onEditProfile,
  onLogout,
  onAddClick,
}) {
  return (
    <div className={styles.profile}>
      <Header onAddClick={onAddClick} />
      <div className={styles.profile__container}>
        <SideBar
          userName={userName}
          avatar={avatar}
          onEditProfile={onEditProfile}
          onLogout={onLogout}
        />
        <ClothesSection onCardClick={onCardClick} />
      </div>
      <Footer />
    </div>
  );
}
