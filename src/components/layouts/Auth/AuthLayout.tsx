import { ReactNode } from "react";
import { FaCoffee, FaSeedling } from "react-icons/fa";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundDecoration}>
        <FaCoffee className={styles.coffeeIcon} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.formSection}>{children}</div>

        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1512663827140-3ef55c96cd49?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Barista preparing coffee"
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <h2 className={styles.overlayTitle}>We Pour Uniqueness</h2>
              <p className={styles.overlayText}>"Every Pour, Uniquely Yours"</p>
            </div>
            <FaSeedling className={styles.cornerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
