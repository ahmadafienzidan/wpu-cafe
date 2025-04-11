// components/home/Hero.tsx
import { Link } from "react-router-dom";
import styles from "../Home.module.css";

const Hero = () => (
  <section className={styles.heroSection}>
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>We Pour Uniqueness</h1>
      <p className={styles.heroSubtitle}>Every Pour, Uniquely Yours</p>
      <div>
        <Link to="/menu" className={styles.menuButton}>
          View Menu
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
