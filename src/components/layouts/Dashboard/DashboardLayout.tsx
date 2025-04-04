import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <i className={`fas fa-coffee ${styles.icon}`}></i>
          <span className={styles.brand}>WPU Cafe</span>
        </div>
        <div className={styles.navRight}>
          <a href="orders.html" className={styles.navLink}>
            Orders
          </a>
          <button className={styles.btn}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default DashboardLayout;
