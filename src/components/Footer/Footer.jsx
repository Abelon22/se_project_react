import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>Developed by John Overton Bell</p>
        <p className={styles.footer__text}>2025</p>
      </div>
    </footer>
  );
}


