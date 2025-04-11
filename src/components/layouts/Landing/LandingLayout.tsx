import { Outlet } from "react-router-dom";
import styles from "./LandingLayout.module.css";
import MainNavbar from "../parts/MainNavbar";
import MainFooter from "../parts/MainFooter";

const LandingLayout = () => {
  return (
    <div>
      <MainNavbar />
      <main className={styles.padding}>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default LandingLayout;
