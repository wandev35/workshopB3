import React, { useState } from "react";
import styles from "./LogIn.module.css"; // Import du CSS Module

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    console.log("Email:", email);
    console.log("Mot de passe:", password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <h2>Connexion</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <button id="button" type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LogIn;