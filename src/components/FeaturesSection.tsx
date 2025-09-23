import { Shield, Wifi, Users, Flame } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Protection avancée de vos données et communications privées",
    },
    {
      icon: Wifi,
      title: "Résilient",
      description: "Fonctionnement même lors de coupures réseau grâce au stockage local",
    },
    {
      icon: Users,
      title: "Communautaire",
      description: "Espace de communication pour renforcer les liens sociaux",
    },
    {
      icon: Flame,
      title: "Fiable",
      description: "Outils essentiels pour une communication constante et stable",
    },
  ];

  return (
    <section id="features-section" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;