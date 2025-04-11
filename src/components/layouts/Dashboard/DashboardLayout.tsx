import styles from "./DashboardLayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { Link } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            <i className={`fas fa-coffee ${styles.icon}`}></i>
            <span className={styles.brand}>WPU Cafe</span>
          </div>
          <div className={styles.navRight}>
            <Link to="/dashboard/create" className={styles.navLink}>
              Create
            </Link>
            <Link to="/dashboard/orders" className={styles.navLink}>
              Orders
            </Link>
            <button onClick={handleLogout} className={styles.btn}>
              Logout
            </button>
          </div>
        </nav>
      </header>
      <main className={styles.page}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
