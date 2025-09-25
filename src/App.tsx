
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Accueil from "./pages/Accueil";
import ChatPage from "./pages/ChatPage";
import Inscription from "./pages/Inscription";
import Listesserveurs from "./pages/Listesserveurs";

// Page de test backend FastAPI
const TestAPI: React.FC = () => {
  const [result, setResult] = useState<any>(null);

  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.1.2:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "1234",
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Test connexion FastAPI</h1>
      <button
        onClick={handleRegister}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Envoyer requête /register
      </button>
      <pre className="mt-4 bg-gray-100 p-2 rounded">
        {result ? JSON.stringify(result, null, 2) : "Aucun résultat"}
      </pre>
    </div>
  );
};

// Création du client React Query
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="accueil" element={<Accueil />} />
            <Route path="inscription" element={<Inscription />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="serveurs" element={<Listesserveurs />} />
            <Route path="test-api" element={<TestAPI />} /> {/* route de test backend */}
            <Route path="*" element={<NotFound />} /> {/* catch-all */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;