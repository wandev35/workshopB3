import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

const Inscription = () => {
  const [survivorName, setsurvivorName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!survivorName || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le mot de passe et sa confirmation sont différents.");
      return;
    }

    setError("");

    try {
      // 👇 Envoi des infos au backend
      const response = await fetch("http://192.168.1.2:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: survivorName,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      setMessage("Inscription réussie ✅ " + JSON.stringify(data));

      // Réinitialisation des champs
      setsurvivorName("");
      setPassword("");
      setconfirmPassword("");

      // Redirection (par ex. page d'accueil)
      navigate("/accueil");

    } catch (err: any) {
      setError("Erreur lors de l'inscription : " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Formulaire d'inscription</h2>
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nom de Survivant</label>
          <input
            type="text"
            value={survivorName}
            onChange={(e) => setsurvivorName(e.target.value)}
            placeholder="Votre nom de survivant"
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

        <div className={styles.formGroup}>
          <label>Confirmez votre mot de passe :</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Retapez votre mot de passe"
            required
          />
        </div>

        <button id="button" type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;