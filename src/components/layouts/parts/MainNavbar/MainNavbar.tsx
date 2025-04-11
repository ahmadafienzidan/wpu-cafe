import styles from "./MainNavbar.module.css";
import { FaCoffee } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <FaCoffee className={styles.brandIcon} />
          <span className={styles.brandText}>WPU Cafe</span>
        </div>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/menu" className={styles.link}>
            Menu
          </Link>
          <Link to="/reviews" className={styles.link}>
            Reviews
          </Link>
          <Link to="/about" className={styles.link}>
            About
          </Link>
          <Link to="/login" className={styles.cta}>
            Staff Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
