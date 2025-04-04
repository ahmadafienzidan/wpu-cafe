import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main className={styles.home}>
      <h1>Welcome to WPU Cafe</h1>
      <Link to="login">
        <Button>Login</Button>
      </Link>
    </main>
  );
};
