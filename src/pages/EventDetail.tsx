import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { 
  Calendar, MapPin, Clock, Users, Star, Heart, Share2, 
  ArrowLeft, ChevronDown, User, Shield, Wifi, Car, 
  Accessibility, Camera, Award, CheckCircle 
} from "lucide-react";

// Import images
import concertImage from "@/assets/event-concert.jpg";
import workshopImage from "@/assets/event-workshop.jpg";
import outdoorImage from "@/assets/event-outdoor.jpg";

// Mock event data
const mockEvent = {
  id: "1",
  title: "Live Music Festival 2024 - Special Edition",
  images: [concertImage, workshopImage, outdoorImage],
  category: "Musica",
  date: "15 Nov 2024",
  time: "20:00 - 02:00",
  location: "Stadio San Siro, Milano",
  fullAddress: "Via Piccolomini, 5, 20151 Milano MI",
  price: "€45",
  originalPrice: "€60",
  organizer: {
    name: "MusicEvents Italia",
    rating: 4.9,
    eventsCount: 127,
    verified: true,
    joinedDate: "2019"
  },
  rating: 4.8,
  reviewsCount: 342,
  attendees: 2500,
  maxCapacity: 3000,
  isOnline: false,
  description: `
    <p>Preparati per una notte indimenticabile con il Live Music Festival 2024! Quest'anno presentiamo una lineup eccezionale con artisti nazionali e internazionali che ti faranno ballare fino all'alba.</p>
    
    <h3>Lineup Artisti:</h3>
    <ul>
      <li>🎤 Marco Mengoni - Headliner</li>
      <li>🎸 The Kolors</li>
      <li>🎹 Diodato</li>
      <li>🎵 Madame</li>
      <li>🎧 DJ Set by Gabry Ponte</li>
    </ul>

    <h3>Cosa aspettarti:</h3>
    <p>• 6 ore di musica live ininterrotta<br/>
    • Food truck gourmet<br/>
    • Area VIP con bar esclusivo<br/>
    • Merchandise ufficiale<br/>
    • Parcheggio dedicato</p>
  `,
  amenities: [
    { icon: Wifi, name: "WiFi Gratuito" },
    { icon: Car, name: "Parcheggio" },
    { icon: Accessibility, name: "Accessibile" },
    { icon: Camera, name: "Foto/Video OK" },
    { icon: Shield, name: "Sicurezza 24h" },
  ],
  ticketTypes: [
    {
      name: "Early Bird",  
      price: "€35",
      originalPrice: "€45",
      description: "Accesso standard, 1 drink incluso",
      available: 0,
      total: 500
    },
    {
      name: "Standard",
      price: "€45", 
      originalPrice: "€60",
      description: "Accesso completo all'evento",
      available: 847,
      total: 2000
    },
    {
      name: "VIP Experience",
      price: "€120",
      originalPrice: "€150", 
      description: "Area VIP, meet & greet, buffet, parcheggio riservato",
      available: 23,
      total: 100
    }
  ],
  reviews: [
    {
      id: 1,
      user: "Marco R.",
      rating: 5,
      date: "2 giorni fa",
      comment: "Evento fantastico! Organizzazione perfetta e artisti incredibili. Lo consiglio vivamente!"
    },
    {
      id: 2, 
      user: "Sara M.",
      rating: 4,
      date: "1 settimana fa", 
      comment: "Bella esperienza, ottima location. Unico neo: code lunghe ai bar."
    },
    {
      id: 3,
      user: "Luca T.",
      rating: 5,
      date: "2 settimane fa",
      comment: "Il miglior festival a cui abbia mai partecipato. Già prenotato per il prossimo anno!"
    }
  ]
};

const EventDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna agli eventi
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={mockEvent.images[selectedImage]} 
                  alt={mockEvent.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex gap-3">
                {mockEvent.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-primary shadow-md' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Event Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">{mockEvent.category}</Badge>
                  <h1 className="text-3xl font-bold leading-tight">{mockEvent.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{mockEvent.rating}</span>
                      <span>({mockEvent.reviewsCount} recensioni)</span>
                    </div>
                    <span>•</span>
                    <span>{mockEvent.attendees} partecipanti</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-secondary/30 rounded-xl">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{mockEvent.date}</p>
                      <p className="text-sm text-muted-foreground">{mockEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{mockEvent.location}</p>
                      <p className="text-sm text-muted-foreground">{mockEvent.fullAddress}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{mockEvent.attendees}/{mockEvent.maxCapacity}</p>
                      <p className="text-sm text-muted-foreground">Partecipanti</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{mockEvent.organizer.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {mockEvent.organizer.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                        <span>Organizzatore verificato</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Descrizione</TabsTrigger>
                <TabsTrigger value="amenities">Servizi</TabsTrigger>
                <TabsTrigger value="reviews">Recensioni</TabsTrigger>
                <TabsTrigger value="organizer">Organizzatore</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div 
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: mockEvent.description }}
                />
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockEvent.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                      <amenity.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6 space-y-4">
                {mockEvent.reviews.slice(0, showAllReviews ? undefined : 3).map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
                
                {!showAllReviews && mockEvent.reviews.length > 3 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAllReviews(true)}
                    className="w-full"
                  >
                    Mostra tutte le recensioni
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </TabsContent>
              
              <TabsContent value="organizer" className="mt-6">
                <div className="p-6 border rounded-xl space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {mockEvent.organizer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{mockEvent.organizer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{mockEvent.organizer.rating} • {mockEvent.organizer.eventsCount} eventi</span>
                        {mockEvent.organizer.verified && (
                          <>
                            <span>•</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Verificato</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Organizzatore di eventi dal {mockEvent.organizer.joinedDate}. 
                    Specializzato in concerti e festival musicali di alta qualità.
                  </p>
                  <Button variant="outline" className="w-full">
                    Vedi tutti gli eventi
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="p-6 border rounded-2xl shadow-lg bg-card">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary">{mockEvent.price}</span>
                    <span className="text-lg text-muted-foreground line-through">{mockEvent.originalPrice}</span>
                    <Badge variant="destructive" className="text-xs">-25%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">per persona</p>
                </div>

                {/* Ticket Selection */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold">Tipo Biglietto</h4>
                  {mockEvent.ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedTicket === index 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      } ${ticket.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => ticket.available > 0 && setSelectedTicket(index)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{ticket.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{ticket.price}</span>
                          {ticket.originalPrice !== ticket.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {ticket.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{ticket.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className={ticket.available > 0 ? 'text-green-600' : 'text-red-600'}>
                          {ticket.available > 0 ? `${ticket.available} disponibili` : 'Esaurito'}
                        </span>
                        <span className="text-muted-foreground">
                          {ticket.available}/{ticket.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Booking Actions */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg" variant="hero">
                    Prenota Ora
                  </Button>
                  <Button variant="outline" className="w-full">
                    Aggiungi al Carrello
                  </Button>
                  
                  {/* QR Code Generator */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        📱 Genera QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>QR Code Evento</DialogTitle>
                      </DialogHeader>
                      <QRCodeGenerator 
                        eventId={mockEvent.id}
                        eventTitle={mockEvent.title}
                        eventDate={mockEvent.date}
                        eventLocation={mockEvent.location}
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Cancellazione gratuita fino a 24h prima dell'evento
                  </p>
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="p-6 border rounded-2xl bg-card">
                <h4 className="font-semibold mb-4">Posizione</h4>
                <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium mb-1">{mockEvent.location}</p>
                <p className="text-xs text-muted-foreground mb-4">{mockEvent.fullAddress}</p>
                <Button variant="outline" className="w-full" size="sm">
                  Vedi su Mappa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;