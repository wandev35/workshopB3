import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="container mx-auto text-center max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="text-primary block mb-2">Communication</span>
          <span className="text-foreground">Post-Apocalyptique</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Plateforme de communication résiliente pour maintenir les communautés connectées même en cas de perturbations réseau
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* <Button 
            className="btn-wasteland text-lg px-10 py-4 h-auto font-semibold"
            onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Activer le Réseau
          </Button> */}
          <Button 
            className="btn-wasteland-outline text-lg px-10 py-4 h-auto font-semibold"
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Manuel de Survie
          </Button>
          <Button 
            className="btn-wasteland-outline text-lg px-10 py-4 h-auto font-semibold"
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Encyclopédie Participative
          </Button>
          <Button 
            className="btn-wasteland-outline text-lg px-10 py-4 h-auto font-semibold"
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Messagerie Privée
          </Button>
          <Button 
            className="btn-wasteland-outline text-lg px-10 py-4 h-auto font-semibold"
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Centre des comunautées
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;