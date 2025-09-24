import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import de useNavigate
import styles from "./LogIn.module.css"; // Import du CSS Module

const Inscription = () => {
  const [survivorName, setsurvivorName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- Hook pour naviguer

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!survivorName || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password != confirmPassword) {
        setError("Le mot de passe et sa confirmation sont différents.")
        return; 
    }

    setError("");
    console.log("Email:", survivorName);
    console.log("Mot de passe:", password);

    // Réinitialisation des champs
    setsurvivorName("");
    setPassword("");
    setconfirmPassword(""); 

    // Redirection vers la page d'accueil (ou autre)
    navigate("/"); // <-- Ici, le chemin doit correspondre à ta route définie
  };

  return (
    <div className={styles.container}>
      <h2>Formulaire d'inscription</h2>
      {error && <p className={styles.error}>{error}</p>}
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
          <label>Confirmez votre mot de passe : </label>
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