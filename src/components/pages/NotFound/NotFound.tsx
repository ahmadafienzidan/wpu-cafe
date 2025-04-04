// components/NotFound/NotFound.tsx
import { FaCoffee, FaMugHot } from "react-icons/fa";
import styles from "./NotFound.module.css";
import AuthLayout from "../../layouts/Auth";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <AuthLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorIcon}>
            <FaMugHot className={styles.brokenCoffee} />
            <div className={styles.errorNumber}>404</div>
          </div>

          <h1 className={styles.title}>
            Oops! Coffee Spilled...
            <FaCoffee className={styles.coffeeSplash} />
          </h1>

          <p className={styles.description}>
            Seems like this page evaporated faster than our fresh brew.
            <br />
            Let's get you back to the good stuff!
          </p>

          <button onClick={handleGoBack} className={styles.button}>
            Back to Brewing ☕
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default NotFound;
