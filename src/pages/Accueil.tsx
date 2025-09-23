import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ChatSystem from "@/components/ChatSystem";

const Accueil = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ChatSystem />
      </main>
    </div>
  );
};

export default Accueil;