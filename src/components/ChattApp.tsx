// ChatApp.jsx
import { useState } from "react";
import "./ChatApp.css";
import { useNavigate } from "react-router-dom";

export default function ChatApp() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, text: "Salut 👋", sender: "bot" },
    { id: 2, text: "Bienvenue dans le chat !", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  return (
  <div className="chat-container">
    <div className="chat-box">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-message ${msg.sender === "me" ? "me" : "bot"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
    <div className="chat-input">
      <input
        type="text"
        placeholder="Écris un message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Envoyer</button>
    </div>
      {/* Les deux boutons sont maintenant dans le même parent */}
     <button id="button" onClick={() => navigate("/serveurs")}>Retour</button>
  </div>
);
}