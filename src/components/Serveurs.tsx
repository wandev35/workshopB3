import "./Serveurs.css" // on importe le fichier de styles
import { useNavigate } from "react-router-dom";

export default function SimpleTable() {

  const navigate = useNavigate();

  const handleRowClick = () => {
    // Redirection vers la page détail du serveur
    navigate("/chat");
  };
    return (
    <table cellPadding="5" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Nom du salon</th>
        </tr>
      </thead>
      <tbody>
          <tr onClick={() => handleRowClick()}
            style={{
              cursor: "pointer", // pour montrer que c'est cliquable
              backgroundColor: "#f9f9f9",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}>
            <td>Général</td>
          </tr>
          <tr onClick={() => handleRowClick()}
            style={{
              cursor: "pointer", // pour montrer que c'est cliquable
              backgroundColor: "#f9f9f9",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}>
            <td>Urgences</td>
          </tr>
          <tr onClick={() => handleRowClick()}
            style={{
              cursor: "pointer", // pour montrer que c'est cliquable
              backgroundColor: "#f9f9f9",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}>
            <td>Médecine</td>
          </tr>
          <tr onClick={() => handleRowClick()}
            style={{
              cursor: "pointer", // pour montrer que c'est cliquable
              backgroundColor: "#f9f9f9",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}>
            <td>Vie Politique</td>
          </tr>
          <tr onClick={() => handleRowClick()}
            style={{
              cursor: "pointer", // pour montrer que c'est cliquable
              backgroundColor: "#f9f9f9",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}>
            <td>Entraide</td>
          </tr>
          <tr onClick={() => handleRowClick()}
            style={{
              cursor: "pointer", // pour montrer que c'est cliquable
              backgroundColor: "#f9f9f9",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}>
            <td>Gestion des stocks mutualisés</td>
          </tr>
      </tbody>
    </table>

    
  )
}