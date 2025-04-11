import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../../../services/authService";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      login(data.token, data.user);
      localStorage.setItem("token", data.token);
      navigate("/dashboard/create");
    },
    onError: (error) => {
      alert(error.message || "Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please input email and password");
      return;
    }
    mutate({ email, password });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>WPU Cafe☕</h1>
        <p className={styles.subtitle}>"We Pour Uniqueness"</p>
      </div>

      <button onClick={() => navigate("/")} className={styles.backButton}>
        Back to Home
      </button>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input id="email" type="email" placeholder="✨ admin@wpucafe.com" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input id="password" type="password" placeholder="🔑 ••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
        </div>

        <button type="submit" className={styles.button} disabled={isPending}>
          {isPending ? "Loading..." : "Let's Brew! 🚀"}
        </button>
      </form>
    </div>
  );
};

export default Login;
