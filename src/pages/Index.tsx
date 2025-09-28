import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import EventCard from "@/components/EventCard";
import AdvancedFilters from "@/components/AdvancedFilters";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";

// Import event images
import concertImage from "@/assets/event-concert.jpg";
import workshopImage from "@/assets/event-workshop.jpg";
import outdoorImage from "@/assets/event-outdoor.jpg";

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Live Music Festival 2024",
    image: concertImage,
    category: "Musica",
    date: "15 Nov 2024",
    time: "20:00",
    location: "Stadio San Siro, Milano",
    price: "€45",
    organizer: "MusicEvents Italia",
    rating: 4.8,
    attendees: 2500,
    isOnline: false,
  },
  {
    id: "2",  
    title: "Workshop Leadership & Innovation",
    image: workshopImage,
    category: "Business",
    date: "22 Nov 2024",
    time: "09:00",
    location: "Centro Congressi Roma",
    price: "€120",
    organizer: "Business Academy",
    rating: 4.9,
    attendees: 150,
    isOnline: false,
  },
  {
    id: "3",
    title: "Avventura in Montagna",
    image: outdoorImage,
    category: "Sport",
    date: "25 Nov 2024", 
    time: "08:00",
    location: "Dolomiti, Trentino",
    price: "€80",
    organizer: "OutdoorLife",
    rating: 4.7,
    attendees: 45,
    isOnline: false,
  },
  {
    id: "4",
    title: "Masterclass Fotografia Digitale",
    image: workshopImage,
    category: "Fotografia", 
    date: "28 Nov 2024",
    time: "14:00",
    location: "Online - Zoom",
    price: "€35",
    organizer: "PhotoMaster Studio",
    rating: 4.6,
    attendees: 320,
    isOnline: true,
  },
  {
    id: "5",
    title: "Jazz Night al Tramonto",
    image: concertImage,
    category: "Musica",
    date: "30 Nov 2024",
    time: "19:30", 
    location: "Blue Note Milano",
    price: "€25",
    organizer: "Jazz Milano",
    rating: 4.8,
    attendees: 120,
    isOnline: false,
  },
  {
    id: "6",
    title: "Corso di Cucina Italiana",
    image: outdoorImage,
    category: "Food & Drink",
    date: "02 Dic 2024",
    time: "18:00",
    location: "Scuola di Cucina Roma",
    price: "€65",
    organizer: "Cucinare Insieme",
    rating: 4.9,
    attendees: 24,
    isOnline: false,
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEvents = selectedCategory === "all" 
    ? mockEvents 
    : mockEvents.filter(event => event.category.toLowerCase().includes(selectedCategory));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Events Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Eventi in Evidenza</h2>
              <p className="text-muted-foreground">
                Scopri gli eventi più popolari e coinvolgenti della settimana
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <AdvancedFilters 
                onFiltersChange={(filters) => console.log('Filters:', filters)}
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`} className="block hover:scale-[1.02] transition-transform duration-200">
                <EventCard {...event} />
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carica Altri Eventi
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto a Creare il Tuo Evento?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Unisciti a migliaia di organizzatori che hanno già scelto EventHub 
            per promuovere i loro eventi e raggiungere nuovi partecipanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/host/create-event">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Inizia Gratuitamente
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              Scopri le Funzionalità
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
