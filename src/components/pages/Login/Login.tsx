import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}> WPU Cafe☕</h1>
        <p className={styles.subtitle}>"We Pour Uniqueness"</p>
      </div>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input type="email" placeholder="✨ admin@wpucafe.com" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input type="password" placeholder="🔑 ••••••••" className={styles.input} />
        </div>

        <button type="submit" className={styles.button}>
          Let's Brew! 🚀
        </button>
      </form>
    </div>
  );
};

export default Login;
