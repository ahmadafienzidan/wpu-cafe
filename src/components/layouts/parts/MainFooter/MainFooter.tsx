import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from "./MainFooter.module.css";

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>
            <FaFacebook />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaInstagram />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaWhatsapp />
          </a>
        </div>

        <p className={styles.address}>
          Jl. Coffee Bean No. 123, Jakarta
          <br />
          Contact: (021) 555-0123 | hello@wpucafe.com
        </p>

        <p className={styles.copyright}>&copy; 2025 WPU Cafe. All rights reserved</p>
      </div>
    </footer>
  );
};

export default MainFooter;
