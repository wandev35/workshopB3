import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

const Accueil = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Accueil;