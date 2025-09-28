import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-events.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Eventi straordinari ti aspettano" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          Scopri Eventi
          <span className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            Straordinari
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/95 font-light leading-relaxed">
          Dalla musica dal vivo ai workshop creativi, trova e partecipa agli eventi 
          più coinvolgenti nella tua città o online.
        </p>

        {/* Search Widget */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/95 backdrop-blur rounded-2xl shadow-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Che cosa</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Concerti, workshop..."
                  className="w-full pl-12 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Dove</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Milano, Roma..."
                  className="w-full pl-12 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quando</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-12 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold text-base shadow-xl">
                <Search className="h-5 w-5 mr-2" />
                Cerca Eventi
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/home/#events">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-4 text-lg shadow-2xl">
              Esplora Eventi
            </Button>
          </Link>
          <Link to="/host/create-event">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm bg-white/10 font-bold px-8 py-4 text-lg shadow-2xl"
            >
              <Calendar className="h-5 w-5 mr-3" />
              Organizza un Evento
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;