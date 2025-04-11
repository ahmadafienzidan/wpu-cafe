// components/home/Featured.tsx
import { FaMugHot, FaClock, FaWifi } from "react-icons/fa";
import styles from "../Home.module.css";

const Featured = () => (
  <section className={styles.featuredSection}>
    <div className={styles.featuredGrid}>
      <div className={styles.featuredItem}>
        <FaMugHot className={styles.featuredIcon} />
        <h3 className={styles.featuredTitle}>Premium Quality</h3>
        <p className={styles.featuredText}>100% Arabica beans from local farmers</p>
      </div>
      <div className={styles.featuredItem}>
        <FaClock className={styles.featuredIcon} />
        <h3 className={styles.featuredTitle}>Open Daily</h3>
        <p className={styles.featuredText}>7:00 AM - 10:00 PM</p>
      </div>
      <div className={styles.featuredItem}>
        <FaWifi className={styles.featuredIcon} />
        <h3 className={styles.featuredTitle}>Free WiFi</h3>
        <p className={styles.featuredText}>Stay connected while you relax</p>
      </div>
    </div>
  </section>
);

export default Featured;
