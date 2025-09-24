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
          <th>Numéro</th>
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
            <td>1</td>
            <td>Quimper</td>
          </tr>
      </tbody>
    </table>
  )
}