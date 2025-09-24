import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Accueil from "./pages/Accueil";
import Listeserveurs from "./pages/Listesserveurs";
import ChatPage from "./pages/ChatPage";
import Inscription from "./pages/Inscription";

// Exemple d’une page pour tester le backend FastAPI
import TestAPI from "./pages/TestAPI";

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
            <Route path="serveurs" element={<Listeserveurs />} />
            <Route path="test-api" element={<TestAPI />} /> {/* route pour tester le backend */}
            <Route path="*" element={<NotFound />} /> {/* catch-all */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
